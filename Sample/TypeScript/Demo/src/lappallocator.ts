/*
* Copyright(c) Live2D Inc. All rights reserved.
*
* Use of this source code is governed by the Live2D Open Software license
* that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
*/

import {Live2DCubismFramework as icubismallocator} from "../../../../Framework/icubismallcator";
import Csm_ICubismAllocator = icubismallocator.ICubismAllocator;

/**
 * メモリアロケーションを実装するクラス。
 * 
 * メモリ確保・解放処理のインターフェースの実装。
 * フレームワークから呼び出される。
 */
export class LAppAllocator extends Csm_ICubismAllocator
{
    public allocate(size: number): any
    {
        return new ArrayBuffer(size);
    }

    public deallocate(memory: any): void
    {
        if(memory)
        {
            memory = void 0;
        }
    }

    public allocateAligned(size: number, alignment: number): any
    {
        let offset: number, shift: number, alignedAddress;
        let allocation: ArrayBuffer, preamble: ArrayBuffer[];
    
        offset = alignment - 1 + ArrayBuffer.length;
    
        allocation = this.allocate(size + offset);
    
        alignedAddress = allocation.byteLength + ArrayBuffer.length;
    
        shift = alignedAddress % alignment;
    
        if (shift)
        {
            alignedAddress += (alignment - shift);
        }
    
        preamble = <ArrayBuffer[]>alignedAddress;
        preamble[-1] = allocation;
    
        return <ArrayBuffer>alignedAddress;
    }

    public deallocateAligned(alignedMemory: any): void
    {
        let preamble: ArrayBuffer[];

        preamble = <ArrayBuffer[]>alignedMemory;

        this.deallocate(preamble[-1]);
    }

    public constructor()
    {
        super();
    }
}