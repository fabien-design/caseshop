import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/components/Steps";
import { ReactNode } from "react";

const layout = ({children}:{children: ReactNode}) => {
    return (
       <MaxWidthWrapper className="flex flex-1 flex-col items-center justify-center">
            <Steps />
            {children}
        </MaxWidthWrapper>
    )
}

export default layout;