/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import {Live2DCubismFramework as cubismframework} from "./live2dcubismframework";
import {Live2DCubismFramework as icubismmodelsetting} from "./icubismmodelsetting";
import {Live2DCubismFramework as cubismid} from "./id/cubismid";
import {Live2DCubismFramework as cubismjson} from "./utils/cubismjson";
import {Live2DCubismFramework as csmmap} from"./type/csmmap";
import csmMap = csmmap.csmMap;
import iterator = csmmap.iterator;
import CubismFramework = cubismframework.CubismFramework;
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismJson = cubismjson.CubismJson;
import Value = cubismjson.Value;
import ICubismModelSetting = icubismmodelsetting.ICubismModelSetting;


export namespace Live2DCubismFramework
{
    /**
     * Model3Jsonのキー文字列
     */

     // JSON Keys
     const Version: string = "Version";
     const FileReferences: string = "FileReferences";
     const Groups: string = "Groups";
     const Layout: string = "Layout";
     const HitAreas: string = "HitAreas";
     
     const Moc: string = "Moc";
     const Textures: string = "Textures";
     const Physics: string = "Physics";
     const Pose: string = "Pose";
     const Expressions: string = "Expressions";
     const Motions: string = "Motions";
     
     const UserData: string = "UserData";
     const Name: string = "Name";
     const FilePath: string = "File";
     const Id: string = "Id";
     const Ids: string = "Ids";
     const Target: string = "Target";
     
     // Motions
     const Idle: string = "Idle";
     const TapBody: string = "TapBody";
     const PinchIn: string = "PinchIn";
     const PinchOut: string = "PinchOut";
     const Shake: string = "Shake";
     const FlickHead: string = "FlickHead";
     const Parameter: string = "Parameter";
     
     const SoundPath: string = "Sound";
     const FadeInTime: string = "FadeInTime";
     const FadeOutTime: string = "FadeOutTime";
     
     // Layout
     const CenterX: string = "CenterX";
     const CenterY: string = "CenterY";
     const X: string = "X";
     const Y: string = "Y";
     const Width: string = "Width";
     const Height: string = "Height";
     
     const LipSync: string = "LipSync";
     const EyeBlink: string = "EyeBlink";
     
     const InitParameter: string = "init_param";
     const InitPartsVisible: string = "init_parts_visible";
     const Val: string = "val";


     /**
      * Model3Jsonパーサー
      * 
      * model3.jsonファイルをパースして値を取得する
      */
     export class CubismModelSettingJson extends ICubismModelSetting
     {
        /**
         * 引数付きコンストラクタ
         * 
         * @param buffer    Model3Jsonをバイト配列として読み込んだデータバッファ
         * @param size      Model3Jsonのデータサイズ
         */
        public constructor(buffer: ArrayBuffer, size: number)
        {
            super();
            this._json = CubismJson.create(buffer, size);
        }

        /**
         * デストラクタ相当の処理
         */
        public release(): void
        {
            CubismJson.delete(this._json);
        }

        /**
         * CubismJsonオブジェクトを取得する
         * 
         * @return CubismJson
         */
        public GetJson(): CubismJson
        {
            return this._json;
        }

        /**
         * Mocファイルの名前を取得する
         * @return Mocファイルの名前
         */
        public getModelFileName(): string
        {
            if(!this.isExistModelFile())
            {
                return "";
            }
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Moc).getRawString();
        }

        /**
         * モデルが使用するテクスチャの数を取得する
         * テクスチャの数
         */
        public getTextureCount(): number
        {
            if(!this.isExistTextureFiles())
            {
                return 0;
            }
            
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Textures).getSize();
        }

        /**
         * テクスチャが配置されたディレクトリの名前を取得する
         * @return テクスチャが配置されたディレクトリの名前
         */
        public getTextureDirectory(): string
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Textures).getRawString();
        }

        /**
         * モデルが使用するテクスチャの名前を取得する
         * @param index 配列のインデックス値
         * @return テクスチャの名前
         */
        public getTextureFileName(index: number): string
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Textures).getVector().at(index).getRawString();
        }

        /**
         * モデルに設定された当たり判定の数を取得する
         * @return モデルに設定された当たり判定の数
         */
        public getHitAreasCount(): number
        {
            if(!this.isExistHitAreas())
            {
                return 0;
            }

            return this._json.getRoot().getMap().getValue(HitAreas).getSize();
        }

        /**
         * 当たり判定に設定されたIDを取得する
         * 
         * @param index 配列のindex
         * @return 当たり判定に設定されたID
         */
        public getHitAreaId(index: number): CubismIdHandle
        {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getMap().getValue(HitAreas).getVector().at(index).getMap().getValue(Id).getRawString());
        }

        /**
         * 当たり判定に設定された名前を取得する
         * @param index 配列のインデックス値
         * @return 当たり判定に設定された名前
         */
        public getHitAreaName(index: number): string
        {
            return this._json.getRoot().getMap().getValue(HitAreas).getVector().at(index).getMap().getValue(Name).getRawString();
        }

        /**
         * 物理演算設定ファイルの名前を取得する
         * @return 物理演算設定ファイルの名前
         */
        public getPhysicsFileName(): string
        {
            if(!this.isExistPhysicsFile())
            {
                return "";
            }

            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Physics).getRawString();
        }

        /**
         * パーツ切り替え設定ファイルの名前を取得する
         * @return パーツ切り替え設定ファイルの名前
         */
        public getPoseFileName(): string
        {
            if(!this.isExistPoseFile())
            {
                return "";
            }

            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Pose).getRawString();
        }

        /**
         * 表情設定ファイルの数を取得する
         * @return 表情設定ファイルの数
         */
        public getExpressionCount(): number
        {
            if(!this.isExistExpressionFile())
            {
                return 0;
            }

            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Expressions).getSize();
        }

        /**
         * 表情設定ファイルを識別する名前（別名）を取得する
         * @param index 配列のインデックス値
         * @return 表情の名前
         */
        public getExpressionName(index: number): string
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Expressions).getVector().at(index).getMap().getValue(Name).getRawString();
        }

        /**
         * 表情設定ファイルの名前を取得する
         * @param index 配列のインデックス値
         * @return 表情設定ファイルの名前
         */
        public getExpressionFileName(index: number): string
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Expressions).getVector().at(index).getMap().getValue(FilePath).getRawString();
        }

        /**
         * モーショングループの数を取得する
         * @return モーショングループの数
         */
        public getMotionGroupCount(): number
        {
            if(!this.isExistMotionGroups())
            {
                return 0;
            }

            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Motions).getMap().getSize();
        }

        /**
         * モーショングループの名前を取得する
         * @param index 配列のインデックス値
         * @return モーショングループの名前
         */
        public getMotionGroupName(index: number): string
        {
            if(!this.isExistMotionGroups())
            {
                return null;
            }

            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Motions).getKeys().at(index);
        }

        /**
         * モーショングループに含まれるモーションの数を取得する
         * @param groupName モーショングループの名前
         * @return モーショングループの数
         */
        public getMotionCount(groupName: string): number
        {
            if(!this.isExistMotionGroupName(groupName))
            {
                return 0;
            }

            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Motions).getMap().getValue(groupName).getSize();
        }

        /**
         * グループ名とインデックス値からモーションファイル名を取得する
         * @param groupName モーショングループの名前
         * @param index     配列のインデックス値
         * @return モーションファイルの名前
         */
        public getMotionFileName(groupName: string, index: number): string
        {
            if(!this.isExistMotionGroupName(groupName))
            {
                return "";
            }

            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Motions).getMap().getValue(groupName).getVector().at(index).getMap().getValue(FilePath).getRawString();
        }

        /**
         * モーションに対応するサウンドファイルの名前を取得する
         * @param groupName モーショングループの名前
         * @param index 配列のインデックス値
         * @return サウンドファイルの名前
         */
        public getMotionSoundFileName(groupName: string, index: number): string
        {
            if(!this.isExistMotionSoundFile(groupName, index))
            {
                return "";
            }

            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Motions).getMap().getValue(groupName).getVector().at(index).getMap().getValue(SoundPath).getRawString();
        }

        /**
         * モーション開始時のフェードイン処理時間を取得する
         * @param groupName モーショングループの名前
         * @param index 配列のインデックス値
         * @return フェードイン処理時間[秒]
         */
        public getMotionFadeInTimeValue(groupName: string, index: number): number
        {
            if(!this.isExistMotionFadeIn(groupName, index))
            {
                return -1.0;
            }
            
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Motions).getMap().getValue(groupName).getVector().at(index).getMap().getValue(FadeInTime).toFloat();
        }

        /**
         * モーション終了時のフェードアウト処理時間を取得する
         * @param groupName モーショングループの名前
         * @param index 配列のインデックス値
         * @return フェードアウト処理時間[秒]
         */
        public getMotionFadeOutTimeValue(groupName: string, index: number): number
        {
            if(!this.isExistMotionFadeOut(groupName, index))
            {
                return -1.0;
            }

            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Motions).getMap().getValue(groupName).getVector().at(index).getMap().getValue(FadeOutTime).toFloat();
        }

        /**
         * ユーザーデータのファイル名を取得する
         * @return ユーザーデータのファイル名
         */
        public getUserDataFile(): string
        {
            if(!this.isExistUserDataFile())
            {
                return "";
            }

            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(UserData).getRawString();
        }

        /**
         * レイアウト情報を取得する
         * @param outLayoutMap csmMapクラスのインスタンス
         * @return true レイアウト情報が存在する
         * @return false レイアウト情報が存在しない
         */
        public getLayoutMap(outLayoutMap: csmMap<string, number>): boolean
        {
            // 存在しない要素にアクセスするとエラーになるためValueがnullの場合はnullを代入する
            let map: csmMap<string, Value> = (this._json.getRoot().getMap().isExist(Layout))
                ? this._json.getRoot().getMap().getValue(Layout).getMap()
                : null;

            if(map == null)
            {
                return false;
            }

            let ret: boolean = false;

            for(const ite: iterator<string, Value> = map.begin(); ite.notEqual(map.end()); ite.preIncrement())
            {
                outLayoutMap.setValue(ite.ptr().first, ite.ptr().second.toFloat());
                ret = true;
            }

            return ret;
        }

        /**
         * 目パチに関連付けられたパラメータの数を取得する
         * @return 目パチに関連付けられたパラメータの数
         */
        public getEyeBlinkParameterCount(): number
        {
            if (!this.isExistEyeBlinkParameters())
            {
                return 0;
            }
        
            let num: number = 0;
            for (let i = 0; i < this._json.getRoot().getMap().getValue(Groups).getSize(); i++)
            {
                if (this._json.getRoot().getMap().getValue(Groups).getVector().at(i).getMap().getValue(Name).getRawString() == EyeBlink)
                {
                    num = this._json.getRoot().getMap().getValue(Groups).getVector().at(i).getMap().getValue(Ids).getVector().getSize();
                    break;
                }
            }
        
            return num;
        }

        /**
         * 目パチに関連付けられたパラメータのIDを取得する
         * @param index 配列のインデックス値
         * @return パラメータID
         */
        public getEyeBlinkParameterId(index: number): CubismIdHandle
        {
            if (!this.isExistEyeBlinkParameters())
            {
                return null;
            }
        
            for (let i = 0; i < this._json.getRoot().getMap().getValue(Groups).getSize(); i++)
            {
                if (this._json.getRoot().getMap().getValue(Groups).getVector().at(i).getMap().getValue(Name).getRawString() == EyeBlink)
                {
                    return CubismFramework.getIdManager().getId(this._json.getRoot().getMap().getValue(Groups).getVector().at(i).getMap().getValue(Ids).getVector().at(index).getRawString());
                }
            }
            return null;
        }

        /**
         * リップシンクに関連付けられたパラメータの数を取得する
         * @return リップシンクに関連付けられたパラメータの数
         */
        public getLipSyncParameterCount(): number
        {
            if (!this.isExistLipSyncParameters())
            {
                return 0;
            }
        
            let num: number = 0;
            for (let i: number = 0; i < this._json.getRoot().getMap().getValue(Groups).getSize(); i++)
            {
                if (this._json.getRoot().getMap().getValue(Groups).getVector().at(i).getMap().getValue(Name).getRawString() == LipSync)
                {
                    num = this._json.getRoot().getMap().getValue(Groups).getVector().at(i).getMap().getValue(Ids).getVector().getSize();
                    break;
                }
            }
        
            return num;
        }

        /**
         * リップシンクに関連付けられたパラメータの数を取得する
         * @param index 配列のインデックス値
         * @return パラメータID
         */
        public getLipSyncParameterId(index: number): CubismIdHandle
        {
            if (!this.isExistLipSyncParameters())
            {
                return null;
            }
        
            for (let i: number = 0; i < this._json.getRoot().getMap().getValue(Groups).getSize(); i++)
            {
                if (this._json.getRoot().getMap().getValue(Groups).getVector().at(i).getMap().getValue(Name).getRawString() == LipSync)
                {
                    return CubismFramework.getIdManager().getId(this._json.getRoot().getMap().getValue(Groups).getVector().at(i).getMap().getValue(Ids).getVector().at(index).getRawString());
                }
            }
            return null;
        }

        /**
         * モデルファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistModelFile(): boolean
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().isExist(Moc);
        }

        /**
         * テクスチャファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistTextureFiles(): boolean
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().isExist(Textures);
        }

        /**
         * 当たり判定のキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistHitAreas(): boolean
        {
            return this._json.getRoot().getMap().isExist(HitAreas);
        }

        /**
         * 物理演算ファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistPhysicsFile(): boolean
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().isExist(Physics);
        }

        /**
         * ポーズ設定ファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistPoseFile(): boolean
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().isExist(Pose);
        }
        
        /**
         * 表情設定ファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistExpressionFile(): boolean
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().isExist(Expressions);
        }

        /**
         * モーショングループのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistMotionGroups(): boolean
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().isExist(Motions);
        }

        /**
         * 引数で指定したモーショングループのキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistMotionGroupName(groupName: string): boolean
        {
            if(!this._json.getRoot().getMap().getValue(FileReferences).getMap().isExist(Motions))
            {
                return false;
            }
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Motions).getMap().isExist(groupName);
        }

        /**
         * 引数で指定したモーションに対応するサウンドファイルのキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @param index 配列のインデックス値
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistMotionSoundFile(groupName: string, index: number): boolean
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Motions).getMap().getValue(groupName).getVector().at(index).getMap().isExist(SoundPath);
        }

        /**
         * 引数で指定したモーションに対応するフェードイン時間のキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @param index 配列のインデックス値
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistMotionFadeIn(groupName: string, index: number): boolean
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Motions).getMap().getValue(groupName).getVector().at(index).getMap().isExist(FadeInTime);
        }

        /**
         * 引数で指定したモーションに対応するフェードアウト時間のキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @param index 配列のインデックス値
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistMotionFadeOut(groupName: string, index: number): boolean
        {
            return this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(Motions).getMap().getValue(groupName).getVector().at(index).getMap().isExist(FadeOutTime);
        }

        /**
         * UserDataのファイル名が存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistUserDataFile(): boolean
        {
            if(!this._json.getRoot().getMap().getValue(FileReferences).getMap().isExist(UserData))
            {
                return false;
            }
            return !this._json.getRoot().getMap().getValue(FileReferences).getMap().getValue(UserData).isNull();
        }

        /**
         * 目ぱちに対応付けられたパラメータが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistEyeBlinkParameters(): boolean
        {
            if(!this._json.getRoot().getMap().isExist(Groups))
            {
                return false;
            }
            for (let i: number = 0; i < this._json.getRoot().getMap().getValue(Groups).getSize(); ++i)
            {
                if (this._json.getRoot().getMap().getValue(Groups).getVector().at(i).getMap().getValue(Name).getRawString() == EyeBlink)
                {
                    return true;
                }
            }
            
            return false;
        }

        /**
         * リップシンクに対応付けられたパラメータが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        private isExistLipSyncParameters(): boolean
        {
            if(!this._json.getRoot().getMap().isExist(Groups))
            {
                return false;
            }
            for (let i: number = 0; i < this._json.getRoot().getMap().getValue(Groups).getSize(); ++i)
            {
                if (this._json.getRoot().getMap().getValue(Groups).getVector().at(i).getMap().getValue(Name).getRawString() == LipSync)
                {
                    return true;
                }
            }
            return false;
        }
        
        
        private _json: CubismJson;
     }
}