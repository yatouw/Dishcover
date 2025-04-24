// WebXR API Type Definitions
declare global {
    interface XRSystem {
        isSessionSupported(sessionType: 'immersive-vr' | 'immersive-ar' | 'inline'): Promise<boolean>;
        requestSession(sessionType: 'immersive-vr' | 'immersive-ar' | 'inline', options?: XRSessionInit): Promise<XRSession>;
    }

    interface XRSession {
        end(): Promise<void>;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    }

    interface XRSessionInit {
        requiredFeatures?: string[];
        optionalFeatures?: string[];
    }

    interface Navigator {
        xr?: XRSystem;
    }
}

// WebXR API Class
export class WebXRManager {
    private xr: XRSystem | null = null;
    private session: XRSession | null = null;
    private isSupported: boolean = false;

    constructor() {
        if (typeof navigator !== 'undefined' && navigator.xr) {
            this.xr = navigator.xr;
        }
    }

    async checkSupport(): Promise<boolean> {
        if (!this.xr) {
            this.isSupported = false;
            return false;
        }

        try {
            this.isSupported = await this.xr.isSessionSupported('immersive-vr');
            return this.isSupported;
        } catch (error) {
            console.error('Error checking WebXR support:', error);
            this.isSupported = false;
            return false;
        }
    }

    async startSession(): Promise<XRSession | null> {
        if (!this.xr || !this.isSupported) {
            throw new Error('WebXR is not supported');
        }

        try {
            this.session = await this.xr.requestSession('immersive-vr', {
                requiredFeatures: ['local-floor'],
                optionalFeatures: ['hand-tracking', 'layers']
            });

            this.session.addEventListener('end', () => {
                this.session = null;
            });

            return this.session;
        } catch (error) {
            console.error('Error starting WebXR session:', error);
            throw error;
        }
    }

    async endSession(): Promise<void> {
        if (this.session) {
            try {
                await this.session.end();
                this.session = null;
            } catch (error) {
                console.error('Error ending WebXR session:', error);
                throw error;
            }
        }
    }

    isSessionActive(): boolean {
        return this.session !== null;
    }
}

// Create and export a singleton instance
export const webXRManager = new WebXRManager(); 