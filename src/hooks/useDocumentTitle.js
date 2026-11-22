
import { useEffect } from "react";

function useDocumentTitle(title) {
    useEffect(() => {
        document.title = `${title} | Academia`;
    }, [title]);
}

export default useDocumentTitle;
