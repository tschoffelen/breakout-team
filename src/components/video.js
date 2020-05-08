import React, { useState, useRef, useEffect } from 'react';

const WithJitsi = (props) => {
    const [status, setStatus] = useState(null);

    if (!window.JitsiMeetExternalAPI) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://meet.jit.si/external_api.js';
        script.onload = () => setStatus('loaded');
        script.onerror = () => setStatus('error');
        window.document.head.append(script);
    }

    if (!window.JitsiMeetExternalAPI && status !== 'loaded') {
        return (
            <div className="flex flex-1 p-16 items-center justify-center text-gray-500">Loading...</div>
        );
    }

    return (
        <Video {...props} />
    );
};

function Video({ id, title = 'Video call' }) {
    const ref = useRef();

    useEffect(() => {
        if (!ref || !ref.current) {
            return;
        }
        const options = {
            roomName: id,
            width: '100%',
            height: '100%',
            noSSL: false,
            parentNode: ref.current,
            configOverwrite: {
                useNicks: true,
                doNotStoreRoom: true
            },
            interfaceConfigOverwrite: {
                DEFAULT_BACKGROUND: '#1b202b',
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                APP_NAME: 'Video meeting',
                INVITATION_POWERED_BY: false,
                SHOW_POWERED_BY: false,
                SHOW_DEEP_LINKING_IMAGE: false,
                DEFAULT_REMOTE_DISPLAY_NAME: 'Guest',
                AUTHENTICATION_ENABLE: false,
                SETTINGS_SECTIONS: ['devices', 'language', 'profile'],
                MOBILE_APP_PROMO: false,
                RECENT_LIST_ENABLED: false,
                SHOW_CHROME_EXTENSION_BANNER: false,
                HIDE_KICK_BUTTON_FOR_GUESTS: true,
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'desktop', 'fullscreen',
                    'fodeviceselection', 'settings',
                    'filmstrip', 'tileview'
                ],
            }
        };
        const api = new window.JitsiMeetExternalAPI('meet.jit.si', options);
        api.executeCommand('subject', title);
    }, [ref, id, title]);

    return (
        <div className="flex-1" ref={ref}/>
    );
}

export default WithJitsi;
