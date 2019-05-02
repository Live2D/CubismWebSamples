export declare class LAppSprite {
    constructor(x: number, y: number, width: number, height: number, textureId: WebGLTexture);
    release(): void;
    getTexture(): WebGLTexture;
    render(programId: WebGLProgram): void;
    isHit(pointX: number, pointY: number): boolean;
    _texture: WebGLTexture;
    _vertexBuffer: WebGLBuffer;
    _uvBuffer: WebGLBuffer;
    _indexBuffer: WebGLBuffer;
    _rect: Rect;
    _positionLocation: number;
    _uvLocation: number;
    _textureLocation: WebGLUniformLocation;
    _positionArray: number[];
    _uvArray: number[];
    _indexArray: number[];
    _firstDraw: boolean;
}
export declare class Rect {
    left: number;
    right: number;
    up: number;
    down: number;
}
