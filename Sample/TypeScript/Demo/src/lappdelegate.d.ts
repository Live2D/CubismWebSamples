import { Option as Csm_Option } from "../../../../Framework/live2dcubismframework";
import { LAppView } from "./lappview";
import { LAppTextureManager } from "./lapptexturemanager";
export declare let canvas: HTMLCanvasElement;
export declare let s_instance: LAppDelegate;
export declare let gl: WebGLRenderingContext;
export declare let frameBuffer: WebGLFramebuffer;
export declare class LAppDelegate {
    static getInstance(): LAppDelegate;
    static releaseInstance(): void;
    initialize(): boolean;
    release(): void;
    run(): void;
    createShader(): WebGLProgram;
    getView(): LAppView;
    getTextureManager(): LAppTextureManager;
    constructor();
    initializeCubism(): void;
    _cubismOption: Csm_Option;
    _view: LAppView;
    _captured: boolean;
    _mouseX: number;
    _mouseY: number;
    _isEnd: boolean;
    _textureManager: LAppTextureManager;
}
