import { Live2DCubismFramework as csmrect } from "../type/csmrectf";
import { Live2DCubismFramework as cubismrenderer } from "./cubismrenderer";
import { Live2DCubismFramework as cubismmodel } from "../model/cubismmodel";
import { Live2DCubismFramework as cubsimmatrix44 } from "../math/cubismmatrix44";
import { Live2DCubismFramework as csmmap } from "../type/csmmap";
import { Live2DCubismFramework as csmvector } from "../type/csmvector";
import CubismMatrix44 = cubsimmatrix44.CubismMatrix44;
import csmRect = csmrect.csmRect;
import csmMap = csmmap.csmMap;
import csmVector = csmvector.csmVector;
import CubismModel = cubismmodel.CubismModel;
import CubismRenderer = cubismrenderer.CubismRenderer;
import CubismBlendMode = cubismrenderer.CubismBlendMode;
import CubismTextureColor = cubismrenderer.CubismTextureColor;
export declare namespace Live2DCubismFramework {
    class CubismClippingManager_WebGL {
        getChannelFlagAsColor(channelNo: number): CubismTextureColor;
        getMaskRenderTexture(): WebGLFramebuffer;
        setGL(gl: WebGLRenderingContext): void;
        calcClippedDrawTotalBounds(model: CubismModel, clippingContext: CubismClippingContext): void;
        constructor();
        release(): void;
        initialize(model: CubismModel, drawableCount: number, drawableMasks: Int32Array[], drawableMaskCounts: Int32Array): void;
        setupClippingContext(model: CubismModel, renderer: CubismRenderer_WebGL): void;
        findSameClip(drawableMasks: Int32Array, drawableMaskCounts: number): CubismClippingContext;
        setupLayoutBounds(usingClipCount: number): void;
        getColorBuffer(): WebGLTexture;
        getClippingContextListForDraw(): csmVector<CubismClippingContext>;
        setClippingMaskBufferSize(size: number): void;
        getClippingMaskBufferSize(): number;
        _maskRenderTexture: WebGLFramebuffer;
        _colorBuffer: WebGLTexture;
        _currentFrameNo: number;
        _channelColors: csmVector<CubismTextureColor>;
        _maskTexture: CubismRenderTextureResource;
        _clippingContextListForMask: csmVector<CubismClippingContext>;
        _clippingContextListForDraw: csmVector<CubismClippingContext>;
        _clippingMaskBufferSize: number;
        private _tmpMatrix;
        private _tmpMatrixForMask;
        private _tmpMatrixForDraw;
        private _tmpBoundsOnModel;
        gl: WebGLRenderingContext;
    }
    class CubismRenderTextureResource {
        constructor(frameNo: number, texture: WebGLFramebuffer);
        frameNo: number;
        texture: WebGLFramebuffer;
    }
    class CubismClippingContext {
        constructor(manager: CubismClippingManager_WebGL, clippingDrawableIndices: Int32Array, clipCount: number);
        release(): void;
        addClippedDrawable(drawableIndex: number): void;
        getClippingManager(): CubismClippingManager_WebGL;
        setGl(gl: WebGLRenderingContext): void;
        _isUsing: boolean;
        readonly _clippingIdList: Int32Array;
        _clippingIdCount: number;
        _layoutChannelNo: number;
        _layoutBounds: csmRect;
        _allClippedDrawRect: csmRect;
        _matrixForMask: CubismMatrix44;
        _matrixForDraw: CubismMatrix44;
        _clippedDrawableIndexList: number[];
        private _owner;
    }
    class CubismShader_WebGL {
        static getInstance(): CubismShader_WebGL;
        static deleteInstance(): void;
        private constructor();
        release(): void;
        setupShaderProgram(renderer: CubismRenderer_WebGL, textureId: WebGLTexture, vertexCount: number, vertexArray: Float32Array, indexArray: Uint16Array, uvArray: Float32Array, bufferData: {
            vertex: WebGLBuffer;
            uv: WebGLBuffer;
            index: WebGLBuffer;
        }, opacity: number, colorBlendMode: CubismBlendMode, baseColor: CubismTextureColor, isPremultipliedAlpha: boolean, matrix4x4: CubismMatrix44): void;
        releaseShaderProgram(): void;
        generateShaders(): void;
        loadShaderProgram(vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram;
        compileShaderSource(shaderType: GLenum, shaderSource: string): WebGLProgram;
        setGl(gl: WebGLRenderingContext): void;
        _shaderSets: csmVector<CubismShaderSet>;
        gl: WebGLRenderingContext;
    }
    class CubismShaderSet {
        shaderProgram: WebGLProgram;
        attributePositionLocation: GLuint;
        attributeTexCoordLocation: GLuint;
        uniformMatrixLocation: WebGLUniformLocation;
        uniformClipMatrixLocation: WebGLUniformLocation;
        samplerTexture0Location: WebGLUniformLocation;
        samplerTexture1Location: WebGLUniformLocation;
        uniformBaseColorLocation: WebGLUniformLocation;
        uniformChannelFlagLocation: WebGLUniformLocation;
    }
    enum ShaderNames {
        ShaderNames_SetupMask = 0,
        ShaderNames_NormalPremultipliedAlpha = 1,
        ShaderNames_NormalMaskedPremultipliedAlpha = 2,
        ShaderNames_AddPremultipliedAlpha = 3,
        ShaderNames_AddMaskedPremultipledAlpha = 4,
        ShaderNames_MultPremultipliedAlpha = 5,
        ShaderNames_MultMaskedPremultipliedAlpha = 6
    }
    const vertexShaderSrcSetupMask: string;
    const fragmentShaderSrcsetupMask: string;
    const vertexShaderSrc: string;
    const vertexShaderSrcMasked: string;
    const fragmentShaderSrcPremultipliedAlpha: string;
    const fragmentShaderSrcMaskPremultipliedAlpha: string;
    class CubismRenderer_WebGL extends CubismRenderer {
        initialize(model: CubismModel): void;
        bindTexture(modelTextureNo: number, glTexture: WebGLTexture): void;
        getBindedTextures(): csmMap<number, WebGLTexture>;
        setClippingMaskBufferSize(size: number): void;
        getClippingMaskBufferSize(): number;
        constructor();
        release(): void;
        doDrawModel(): void;
        drawMesh(textureNo: number, indexCount: number, vertexCount: number, indexArray: Uint16Array, vertexArray: Float32Array, uvArray: Float32Array, opacity: number, colorBlendMode: CubismBlendMode): void;
        static doStaticRelease(): void;
        setRenderState(fbo: WebGLFramebuffer, viewport: number[]): void;
        preDraw(): void;
        setClippingContextBufferForMask(clip: CubismClippingContext): void;
        getClippingContextBufferForMask(): CubismClippingContext;
        setClippingContextBufferForDraw(clip: CubismClippingContext): void;
        getClippingContextBufferForDraw(): CubismClippingContext;
        startUp(gl: WebGLRenderingContext): void;
        _textures: csmMap<number, WebGLTexture>;
        _sortedDrawableIndexList: csmVector<number>;
        _clippingManager: CubismClippingManager_WebGL;
        _clippingContextBufferForMask: CubismClippingContext;
        _clippingContextBufferForDraw: CubismClippingContext;
        firstDraw: boolean;
        _bufferData: {
            vertex: WebGLBuffer;
            uv: WebGLBuffer;
            index: WebGLBuffer;
        };
        gl: WebGLRenderingContext;
    }
}
