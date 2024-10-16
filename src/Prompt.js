import * as React from "react";
import { useBeforeUnload, useBlocker } from "react-router-dom";

function usePrompt(message, { beforeUnload } = {}) {
    // Create a blocker using `useBlocker` only when a message is provided
    const blocker = useBlocker(!!message);
    const prevState = React.useRef(blocker.state);

    React.useEffect(() => {
        if (blocker.state === "blocked" && prevState.current !== "blocked") {
            const confirmLeave = window.confirm(message);
            if (confirmLeave) {
                blocker.proceed(); // Allow navigation
            } else {
                blocker.reset(); // Cancel navigation
            }
        }
        prevState.current = blocker.state;
    }, [blocker, message]);

    // Warn before unloading the page (browser close, refresh)
    useBeforeUnload(
        React.useCallback(
            (event) => {
                if (beforeUnload && message) {
                    event.preventDefault();
                }
            },
            [message, beforeUnload]
        )
    );
}

function Prompt({ when, message, ...props }) {
    // Only use `usePrompt` when the `when` condition is true
    usePrompt(when ? message : null, props);
    return null;
}

export default Prompt;
