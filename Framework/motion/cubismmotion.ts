﻿/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import {Live2DCubismFramework as cubismmotionjson} from './cubismmotionjson';
import {Live2DCubismFramework as cubismmotioninternal} from './cubismmotioninternal';
import {Live2DCubismFramework as acubismmotion} from './acubismmotion';
import {Live2DCubismFramework as cubismmodel} from '../model/cubismmodel';
import {Live2DCubismFramework as cubismframework} from '../live2dcubismframework';
import {Live2DCubismFramework as cubismmotionqueueentry} from './cubismmotionqueueentry';
import {Live2DCubismFramework as cubismmath} from '../math/cubismmath';
import {Live2DCubismFramework as csmvector} from '../type/csmvector';
import {Live2DCubismFramework as cubismid} from '../id/cubismid';
import {Live2DCubismFramework as csmstring} from '../type/csmstring';
import {CubismLogDebug, CSM_ASSERT} from '../utils/cubismdebug';
import csmString = csmstring.csmString;
import CubismMotionData = cubismmotioninternal.CubismMotionData;
import CubismMotionSegment = cubismmotioninternal.CubismMotionSegment;
import CubismMotionPoint = cubismmotioninternal.CubismMotionPoint;
import CubismMotionEvent = cubismmotioninternal.CubismMotionEvent;
import CubismMotionSegmentType = cubismmotioninternal.CubismMotionSegmentType;
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismMotionCurve = cubismmotioninternal.CubismMotionCurve;
import CubismMotionCurveTarget = cubismmotioninternal.CubismMotionCurveTarget;
import csmVector = csmvector.csmVector;
import CubismMath = cubismmath.CubismMath;
import CubismMotionQueueEntry = cubismmotionqueueentry.CubismMotionQueueEntry;
import CubismFramework = cubismframework.CubismFramework;
import CubismModel = cubismmodel.CubismModel;
import ACubismMotion = acubismmotion.ACubismMotion;
import CubismMotionJson = cubismmotionjson.CubismMotionJson;

export namespace Live2DCubismFramework
{
    const EffectNameEyeBlink: string = "EyeBlink";
    const EffectNameLipSync: string  = "LipSync";
    const TargetNameModel: string = "Model";
    const TargetNameParameter: string = "Parameter";
    const TargetNamePartOpacity: string = "PartOpacity";

    function lerpPoints(a: CubismMotionPoint, b: CubismMotionPoint, t: number): CubismMotionPoint
    {
        let result: CubismMotionPoint = new CubismMotionPoint();

        result.time = a.time + ((b.time - a.time) * t);
        result.value = a.value + ((b.value - a.value) * t);

        return result;
    }

    function linearEvaluate(points: CubismMotionPoint[], time: number): number
    {
        let t: number = (time - points[0].time) / (points[1].time - points[0].time);

        if (t < 0.0)
        {
            t = 0.0;
        }
    
        return points[0].value + ((points[1].value - points[0].value) * t);
    }

    function bezierEvaluate(points: CubismMotionPoint[], time: number): number
    {
        let t: number = (time - points[0].time) / (points[3].time - points[0].time);

        if (t < 0.0)
        {
            t = 0.0;
        }

        const p01: CubismMotionPoint = lerpPoints(points[0], points[1], t);
        const p12: CubismMotionPoint = lerpPoints(points[1], points[2], t);
        const p23: CubismMotionPoint = lerpPoints(points[2], points[3], t);
        
        const p012: CubismMotionPoint = lerpPoints(p01, p12, t);
        const p123: CubismMotionPoint = lerpPoints(p12, p23, t);
        
        return lerpPoints(p012, p123, t).value;
    }

    function steppedEvaluate(points: CubismMotionPoint[], time: number): number
    {
        return points[0].value;
    }

    function inverseSteppedEvaluate(points: CubismMotionPoint[], time: number): number
    {
        return points[1].value;
    }
    
    function evaluateCurve(motionData: CubismMotionData, index: number, time: number): number
    {
        // Find segment to evaluate.
        const curve: CubismMotionCurve = motionData.curves.at(index);

        let target: number = -1;
        const totalSegmentCount: number = curve.baseSegmentIndex + curve.segmentCount;
        let pointPosition: number = 0;
        for (let i: number = curve.baseSegmentIndex; i < totalSegmentCount; ++i)
        {
            // Get first point of next segment.
            pointPosition = motionData.segments.at(i).basePointIndex
                + (motionData.segments.at(i).segmentType == CubismMotionSegmentType.CubismMotionSegmentType_Bezier
                    ? 3
                    : 1);


            // Break if time lies within current segment.
            if (motionData.points.at(pointPosition).time > time)
            {
                target = i;
                break;
            }
        }


        if (target == -1)
        {
            return motionData.points.at(pointPosition).value;
        }


        const segment: CubismMotionSegment = motionData.segments.at(target);

        return segment.evaluate(motionData.points.get(segment.basePointIndex), time);
    }

    /**
     * モーションクラス
     * 
     * モーションのクラス。
     */
    export class CubismMotion extends ACubismMotion
    {
        /**
         * インスタンスを作成する
         * 
         * @param buffer motion3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         * @return 作成されたインスタンス
         */
        public static create(buffer: ArrayBuffer, size: number): CubismMotion
        {
            let ret: CubismMotion = new CubismMotion();

            ret.parse(buffer, size);
            ret._sourceFrameRate = ret._motionData.fps;
            ret._loopDurationSeconds = ret._motionData.duration;
        
            // NOTE: Editorではループありのモーション書き出しは非対応
            // ret->_loop = (ret->_motionData->Loop > 0);
            return ret;
        }

        /**
         * モデルのパラメータの更新の実行
         * @param model             対象のモデル
         * @param userTimeSeconds   現在の時刻[秒]
         * @param fadeWeight        モーションの重み
         * @param motionQueueEntry  CubismMotionQueueManagerで管理されているモーション
         */
        public doUpdateParameters(model: CubismModel, userTimeSeconds: number, fadeWeight: number, motionQueueEntry: CubismMotionQueueEntry): void
        {
            if (this._modelCurveIdEyeBlink == null)
            {
                this._modelCurveIdEyeBlink = CubismFramework.getIdManager().getId(EffectNameEyeBlink);
            }

            if (this._modelCurveIdLipSync == null)
            {
                this._modelCurveIdLipSync = CubismFramework.getIdManager().getId(EffectNameLipSync);
            }

            let timeOffsetSeconds: number = userTimeSeconds - motionQueueEntry.getStartTime();

            if (timeOffsetSeconds < 0.0)
            {
                timeOffsetSeconds = 0.0; // エラー回避
            }

            let lipSyncValue: number = Number.MAX_VALUE;
            let eyeBlinkValue: number = Number.MAX_VALUE;
        
            //まばたき、リップシンクのうちモーションの適用を検出するためのビット（maxFlagCount個まで
            const  MaxTargetSize = 64;
            let lipSyncFlags = 0;
            let eyeBlinkFlags = 0;

            //瞬き、リップシンクのターゲット数が上限を超えている場合
            if (this._eyeBlinkParameterIds.getSize() > MaxTargetSize)
            {
                CubismLogDebug("too many eye blink targets : {0}", this._eyeBlinkParameterIds.getSize());
            }
            if (this._lipSyncParameterIds.getSize() > MaxTargetSize)
            {
                CubismLogDebug("too many lip sync targets : {0}", this._lipSyncParameterIds.getSize());
            }

            const tmpFadeIn: number = (this._fadeInSeconds <= 0.0)
                                            ? 1.0
                                            : CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / this._fadeInSeconds);

            const tmpFadeOut: number = (this._fadeOutSeconds <= 0.0 || motionQueueEntry.getEndTime() < 0.0)
                                            ? 1.0
                                            : CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) / this._fadeOutSeconds);
            let value: number;
            let c: number, parameterIndex: number, partIndex: number;

            // 'Repeat' time as necessary.
            let time: number = timeOffsetSeconds;

            if (this._isLoop)
            {
                while (time > this._motionData.duration)
                {
                    time -= this._motionData.duration;
                }
            }

            let curves: csmVector<CubismMotionCurve> = this._motionData.curves;

            // Evaluate model curves.
            for (c = 0; c < this._motionData.curveCount && curves.at(c).type == CubismMotionCurveTarget.CubismMotionCurveTarget_Model; ++c)
            {
                // Evaluate curve and call handler.
                value = evaluateCurve(this._motionData, c, time);
        
                if (curves.at(c).id == this._modelCurveIdEyeBlink)
                {
                    eyeBlinkValue = value;
                }
                else if (curves.at(c).id == this._modelCurveIdLipSync)
                {
                    lipSyncValue = value;
                }
            }

            let parameterMotionCurveCount: number = 0;

            for (; c < this._motionData.curveCount && curves.at(c).type == CubismMotionCurveTarget.CubismMotionCurveTarget_Parameter; ++c)
            {
                parameterMotionCurveCount++;

                // Find parameter index.
                parameterIndex = model.getParameterIndex(curves.at(c).id);
        
                // Skip curve evaluation if no value in sink.
                if (parameterIndex == -1)
                {
                    continue;
                }
                
                const sourceValue: number = model.getParameterValueByIndex(parameterIndex);

                // Evaluate curve and apply value.
                value = evaluateCurve(this._motionData, c, time);

                if (eyeBlinkValue != Number.MAX_VALUE)
                {
                    for (let i: number = 0; i < this._eyeBlinkParameterIds.getSize() && i < MaxTargetSize; ++i)
                    {
                        if (this._eyeBlinkParameterIds.at(i) == curves.at(c).id)
                        {
                            value *= eyeBlinkValue;
                            eyeBlinkFlags |= 1 << i;
                            break;
                        }
                    }
                }

                if(lipSyncValue != Number.MAX_VALUE)
                {
                    for(let i: number = 0; i < this._lipSyncParameterIds.getSize() && i < MaxTargetSize; ++i)
                    {
                        if(this._lipSyncParameterIds.at(i) == curves.at(c).id)
                        {
                            value += lipSyncValue;
                            lipSyncFlags |= 1 << i;
                            break;
                        }
                    }
                }

                let v: number;

                // パラメータごとのフェード
                if(curves.at(c).fadeInTime < 0.0 && curves.at(c).fadeOutTime < 0.0)
                {
                    // モーションのフェードを適用
                    v = sourceValue + (value - sourceValue) * fadeWeight;
                }
                else
                {
                    // パラメータに対してフェードインかフェードアウトが設定してある場合はそちらを適用
                    let fin: number;
                    let fout: number;

                    if(curves.at(c).fadeInTime < 0.0)
                    {
                        fin = tmpFadeIn;
                    }
                    else
                    {
                        fin = curves.at(c).fadeInTime == 0.0
                            ? 1.0
                            :CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / curves.at(c).fadeInTime);
                    }

                    if(curves.at(c).fadeOutTime < 0.0)
                    {
                        fout = tmpFadeOut;
                    }
                    else
                    {
                        fout = (curves.at(c).fadeOutTime == 0.0 || motionQueueEntry.getEndTime() < 0.0)
                                ? 1.0
                                : CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) / curves.at(c).fadeOutTime);
                    }

                    const paramWeight: number = this._weight * fin * fout;

                    // パラメータごとのフェードを適用
                    v = sourceValue + (value - sourceValue) * paramWeight;
                }

                model.setParameterValueByIndex(parameterIndex, v, 1.0);
            }

            {
                if(eyeBlinkValue != Number.MAX_VALUE)
                {
                    for(let i: number = 0; i < this._eyeBlinkParameterIds.getSize() && i < MaxTargetSize; ++i)
                    {
                        const sourceValue: number = model.getParameterValueById(this._eyeBlinkParameterIds.at(i));

                        // モーションでの上書きがあった時にはまばたきは適用しない
                        if((eyeBlinkFlags >> i) & 0x01)
                        {
                            continue;
                        }

                        const v: number = sourceValue + (eyeBlinkValue - sourceValue) * fadeWeight;

                        model.setParameterValueById(this._eyeBlinkParameterIds.at(i), v);
                    }
                }

                if(lipSyncValue != Number.MAX_VALUE)
                {
                    for(let i: number = 0; i < this._lipSyncParameterIds.getSize() && i < MaxTargetSize; ++i)
                    {
                        const sourceValue: number = model.getParameterValueById(this._lipSyncParameterIds.at(i));

                        // モーションでの上書きがあった時にはリップシンクは適用しない
                        if((lipSyncFlags >> i) & 0x01)
                        {
                            continue;
                        }

                        const v: number = sourceValue + (lipSyncValue - sourceValue) * fadeWeight;

                        model.setParameterValueById(this._lipSyncParameterIds.at(i), v);
                    }
                }
            }

            for(; c < this._motionData.curveCount && curves.at(c).type == CubismMotionCurveTarget.CubismMotionCurveTarget_PartOpacity; ++c)
            {
                // Find part index.
                partIndex = model.getPartIndex(curves.at(c).id);

                // Skip curve evaluation if no value in sink.
                if(partIndex == -1)
                {
                    continue;
                }

                // Evaluate curve and apply value.
                value = evaluateCurve(this._motionData, c, time);

                model.setPartOpacityByIndex(partIndex, value);
            }

            if(timeOffsetSeconds >= this._motionData.duration)
            {
                if(this._isLoop)
                {
                    motionQueueEntry.setStartTime(userTimeSeconds); // 最初の状態へ
                    if(this._isLoopFadeIn)
                    {
                        // ループ内でループ用フェードインが有効の時は、フェードイン設定し直し
                        motionQueueEntry.setFadeInStartTime(userTimeSeconds);
                    }
                }
                else
                {
                    motionQueueEntry.setIsFinished(true);
                }
            }
            this._lastWeight = fadeWeight;
        }

        /**
         * ループ情報の設定
         * @param loop ループ情報
         */
        public setIsLoop(loop: boolean): void
        {
            this._isLoop = loop;
        }

        /**
         * ループ情報の取得
         * @return true ループする
         * @return false ループしない
         */
        public isLoop(): boolean
        {
            return this._isLoop;
        }

        /**
         * ループ時のフェードイン情報の設定
         * @param loopFadeIn  ループ時のフェードイン情報
         */
        public setIsLoopFadeIn(loopFadeIn: boolean): void
        {
            this._isLoopFadeIn = loopFadeIn;
        }

        /**
         * ループ時のフェードイン情報の取得
         *
         * @return  true    する
         * @return  false   しない
         */
        public isLoopFadeIn(): boolean
        {
            return this._isLoopFadeIn;
        }

        /**
         * モーションの長さを取得する。
         *
         * @return  モーションの長さ[秒]
         */
        public getDuration(): number
        {
            return this._isLoop ? -1.0 : this._loopDurationSeconds;
        }

        /**
         * モーションのループ時の長さを取得する。
         *
         * @return  モーションのループ時の長さ[秒]
         */
        public getLoopDuration(): number
        {
            return this._loopDurationSeconds;
        }

        /**
         * パラメータに対するフェードインの時間を設定する。
         *
         * @param parameterId     パラメータID
         * @param value           フェードインにかかる時間[秒]
         */
        public setParameterFadeInTime(parameterId: CubismIdHandle, value: number): void
        {
            let curves: csmVector<CubismMotionCurve> = this._motionData.curves;

            for (let i: number = 0; i < this._motionData.curveCount; ++i)
            {
                if (parameterId == curves.at(i).id)
                {
                    curves.at(i).fadeInTime = value;
                    return;
                }
            }
        }

        /**
        * パラメータに対するフェードアウトの時間の設定
        * @param parameterId     パラメータID
        * @param value           フェードアウトにかかる時間[秒]
        */
        public setParameterFadeOutTime(parameterId: CubismIdHandle, value: number): void
        {
            let curves: csmVector<CubismMotionCurve> = this._motionData.curves;

            for (let i: number = 0; i < this._motionData.curveCount; ++i)
            {
                if (parameterId == curves.at(i).id)
                {
                    curves.at(i).fadeOutTime = value;
                    return;
                }
            }
        }

        /**
        * パラメータに対するフェードインの時間の取得
        * @param    parameterId     パラメータID
        * @return   フェードインにかかる時間[秒]
        */
        public getParameterFadeInTime(parameterId: CubismIdHandle): number
        {
            let curves: csmVector<CubismMotionCurve> = this._motionData.curves;

            for (let i: number = 0; i < this._motionData.curveCount; ++i)
            {
                if (parameterId == curves.at(i).id)
                {
                    return curves.at(i).fadeInTime;
                }
            }

            return -1;
        }

        /**
        * パラメータに対するフェードアウトの時間を取得
        *
        * @param   parameterId     パラメータID
        * @return   フェードアウトにかかる時間[秒]
        */
        public getParameterFadeOutTime(parameterId: CubismIdHandle): number
        {
            let curves: csmVector<CubismMotionCurve> = this._motionData.curves;

            for (let i: number = 0; i < this._motionData.curveCount; ++i)
            {
                if (parameterId == curves.at(i).id)
                {
                    return curves.at(i).fadeOutTime;
                }
            }

            return -1;
        }

        /**
         * 自動エフェクトがかかっているパラメータIDリストの設定
         * @param eyeBlinkParameterIds    自動まばたきがかかっているパラメータIDのリスト
         * @param lipSyncParameterIds     リップシンクがかかっているパラメータIDのリスト
         */
        public setEffectIds(eyeBlinkParameterIds: csmVector<CubismIdHandle>, lipSyncParameterIds: csmVector<CubismIdHandle>): void
        {
            this._eyeBlinkParameterIds = eyeBlinkParameterIds;
            this._lipSyncParameterIds = lipSyncParameterIds;
        }

        /**
         * コンストラクタ
         */
        public constructor()
        {
            super();
            this._sourceFrameRate = 30.0;
            this._loopDurationSeconds = -1.0;
            this._isLoop = false;           // trueから false へデフォルトを変更
            this._isLoopFadeIn = true;      // ループ時にフェードインが有効かどうかのフラグ
            this._lastWeight = 0.0;
            this._motionData = null;
            this._modelCurveIdEyeBlink = null;
            this._modelCurveIdLipSync = null;
            this._eyeBlinkParameterIds = null;
            this._lipSyncParameterIds = null;
        }

        /**
         * デストラクタ相当の処理
         */
        public release(): void
        {
            this._motionData = void 0;
            this._motionData = null;
        }

        /**
         * motion3.jsonをパースする。
         *
         * @param motionJson  motion3.jsonが読み込まれているバッファ
         * @param size        バッファのサイズ
         */
        public parse(motionJson: ArrayBuffer, size: number): void
        {
            this._motionData = new CubismMotionData();

            let json: CubismMotionJson = new CubismMotionJson(motionJson, size);
        
            this._motionData.duration = json.getMotionDuration();
            this._motionData.loop = json.isMotionLoop();
            this._motionData.curveCount = json.getMotionCurveCount();
            this._motionData.fps = json.getMotionFps();
            this._motionData.eventCount = json.getEventCount();
        
            if (json.isExistMotionFadeInTime())
            {
                this._fadeInSeconds = (json.getMotionFadeInTime() < 0.0)
                                     ? 1.0
                                     : json.getMotionFadeInTime();
            }
            else
            {
                this._fadeInSeconds = 1.0;
            }

            if (json.isExistMotionFadeOutTime())
            {
                this._fadeOutSeconds = (json.getMotionFadeOutTime() < 0.0)
                                      ? 1.0
                                      : json.getMotionFadeOutTime();
            }
            else
            {
                this._fadeOutSeconds = 1.0;
            }

            this._motionData.curves.updateSize(this._motionData.curveCount, CubismMotionCurve, true);
            this._motionData.segments.updateSize(json.getMotionTotalSegmentCount(), CubismMotionSegment, true);
            this._motionData.points.updateSize(json.getMotionTotalPointCount(), CubismMotionPoint, true);
            this._motionData.events.updateSize(this._motionData.eventCount, CubismMotionEvent, true);
        
            let totalPointCount: number = 0;
            let totalSegmentCount: number = 0;
        
            // Curves
            for (let curveCount: number = 0; curveCount < this._motionData.curveCount; ++curveCount)
            {
                if (json.getMotionCurveTarget(curveCount) == TargetNameModel)
                {
                    this._motionData.curves.at(curveCount).type = CubismMotionCurveTarget.CubismMotionCurveTarget_Model;
                }
                else if (json.getMotionCurveTarget(curveCount) == TargetNameParameter)
                {
                    this._motionData.curves.at(curveCount).type = CubismMotionCurveTarget.CubismMotionCurveTarget_Parameter;
                }
                else if (json.getMotionCurveTarget(curveCount) == TargetNamePartOpacity)
                {
                    this._motionData.curves.at(curveCount).type = CubismMotionCurveTarget.CubismMotionCurveTarget_PartOpacity;
                }

                this._motionData.curves.at(curveCount).id = json.getMotionCurveId(curveCount);

                this._motionData.curves.at(curveCount).baseSegmentIndex = totalSegmentCount;
        
                this._motionData.curves.at(curveCount).fadeInTime =
                        (json.isExistMotionCurveFadeInTime(curveCount))
                            ? json.getMotionCurveFadeInTime(curveCount)
                            : -1.0 ;
                this._motionData.curves.at(curveCount).fadeOutTime =
                        (json.isExistMotionCurveFadeOutTime(curveCount))
                            ? json.getMotionCurveFadeOutTime(curveCount)
                            : -1.0;

                // Segments
                for (let segmentPosition: number = 0; segmentPosition < json.getMotionCurveSegmentCount(curveCount);)
                {
                    if (segmentPosition == 0)
                    {
                        this._motionData.segments.at(totalSegmentCount).basePointIndex = totalPointCount;
        
                        this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition);
                        this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
        
                        totalPointCount += 1;
                        segmentPosition += 2;
                    }
                    else
                    {
                        this._motionData.segments.at(totalSegmentCount).basePointIndex = totalPointCount - 1;
                    }

                    const segment: number = json.getMotionCurveSegment(curveCount, segmentPosition);
                    switch (segment)
                    {
                    case CubismMotionSegmentType.CubismMotionSegmentType_Linear: 
                        {
                            this._motionData.segments.at(totalSegmentCount).segmentType = CubismMotionSegmentType.CubismMotionSegmentType_Linear;
                            this._motionData.segments.at(totalSegmentCount).evaluate = linearEvaluate;
        
                            this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, (segmentPosition + 1));
                            this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, (segmentPosition + 2));
        
                            totalPointCount += 1;
                            segmentPosition += 3;
        
                            break;
                        }
                    case CubismMotionSegmentType.CubismMotionSegmentType_Bezier: 
                        {
                            this._motionData.segments.at(totalSegmentCount).segmentType = CubismMotionSegmentType.CubismMotionSegmentType_Bezier;
                            this._motionData.segments.at(totalSegmentCount).evaluate = bezierEvaluate;
            
                            this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, (segmentPosition + 1));
                            this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, (segmentPosition + 2));

                            this._motionData.points.at(totalPointCount + 1).time = json.getMotionCurveSegment(curveCount, (segmentPosition + 3));
                            this._motionData.points.at(totalPointCount + 1).value = json.getMotionCurveSegment(curveCount, (segmentPosition + 4));

                            this._motionData.points.at(totalPointCount + 2).time = json.getMotionCurveSegment(curveCount, (segmentPosition + 5));
                            this._motionData.points.at(totalPointCount + 2).value = json.getMotionCurveSegment(curveCount, (segmentPosition + 6));
            
                            totalPointCount += 3;
                            segmentPosition += 7;
            
                            break;
                        }

                    case CubismMotionSegmentType.CubismMotionSegmentType_Stepped: 
                        {
                            this._motionData.segments.at(totalSegmentCount).segmentType = CubismMotionSegmentType.CubismMotionSegmentType_Stepped;
                            this._motionData.segments.at(totalSegmentCount).evaluate = steppedEvaluate;

                            this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, (segmentPosition + 1));
                            this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, (segmentPosition + 2));
            
                            totalPointCount += 1;
                            segmentPosition += 3;

                            break;
                        }

                    case CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped: 
                        {
                            this._motionData.segments.at(totalSegmentCount).segmentType = CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped;
                            this._motionData.segments.at(totalSegmentCount).evaluate = inverseSteppedEvaluate;

                            this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, (segmentPosition + 1));
                            this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, (segmentPosition + 2));
            
                            totalPointCount += 1;
                            segmentPosition += 3;
            
                            break;
                        }
                    default:
                        {
                            CSM_ASSERT(0);
                            break;
                        }
                    }

                    ++this._motionData.curves.at(curveCount).segmentCount;
                    ++totalSegmentCount;
                }
            }

            for (let userdatacount: number = 0; userdatacount < json.getEventCount(); ++userdatacount)
            {
                this._motionData.events.at(userdatacount).fireTime = json.getEventTime(userdatacount);
                this._motionData.events.at(userdatacount).value = json.getEventValue(userdatacount);
            }
        
            json.release();
            json = void 0;
            json = null;
        }

        /**
         * モデルのパラメータ更新
         *
         * イベント発火のチェック。
         * 入力する時間は呼ばれるモーションタイミングを０とした秒数で行う。
         *
         * @param beforeCheckTimeSeconds   前回のイベントチェック時間[秒]
         * @param motionTimeSeconds        今回の再生時間[秒]
         */
        public getFiredEvent(beforeCheckTimeSeconds: number, motionTimeSeconds: number): csmVector<csmString>
        {
            this._firedEventValues.updateSize(0);
            
            // イベントの発火チェック
            for (let u: number = 0; u < this._motionData.eventCount; ++u)
            {
                if ((this._motionData.events.at(u).fireTime > beforeCheckTimeSeconds) &&
                    (this._motionData.events.at(u).fireTime <= motionTimeSeconds))
                {
                    this._firedEventValues.pushBack(new csmString(this._motionData.events.at(u).value.s));
                }
            }

            return this._firedEventValues;
        }

        public _sourceFrameRate: number;           // ロードしたファイルのFPS。記述が無ければデフォルト値15fpsとなる
        public _loopDurationSeconds: number;       // mtnファイルで定義される一連のモーションの長さ
        public _isLoop: boolean;                   // ループするか?
        public _isLoopFadeIn: boolean;             // ループ時にフェードインが有効かどうかのフラグ。初期値では有効。
        public _lastWeight: number;                // 最後に設定された重み

        public _motionData: CubismMotionData;                        // 実際のモーションデータ本体
 
        public _eyeBlinkParameterIds: csmVector<CubismIdHandle>;  // 自動まばたきを適用するパラメータIDハンドルのリスト。  モデル（モデルセッティング）とパラメータを対応付ける。
        public _lipSyncParameterIds: csmVector<CubismIdHandle>;   // リップシンクを適用するパラメータIDハンドルのリスト。  モデル（モデルセッティング）とパラメータを対応付ける。
 
        public _modelCurveIdEyeBlink: CubismIdHandle;    // モデルが持つ自動まばたき用パラメータIDのハンドル。  モデルとモーションを対応付ける。
        public _modelCurveIdLipSync: CubismIdHandle;     // モデルが持つリップシンク用パラメータIDのハンドル。  モデルとモーションを対応付ける。
    }
}
