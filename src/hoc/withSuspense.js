import React, {Suspense} from "react";

export const withSuspense = (Component) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Component/>
        </Suspense>
    )
}

//это не совсем HOC, т. к возвращается не компонента, а jsx