import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfiguration";

interface PageProps {
    searchParams : {
        [key: string]: string | string[] | undefined
    }
}

const Page = async ({searchParams} : PageProps) => {
    // make db call

    const { id } = searchParams;
    if(!id || typeof id !== "string"){
        return notFound();
    }

    const configuration = await db.configuration.findUnique({
        where: { id },
    })

    if (!configuration){
        return notFound();
    }

    const { imgUrl, width, height } = configuration

    return <DesignConfigurator configId={configuration.id}
    imageDimensions={{width, height}} 
    imageUrl={imgUrl} />

}

export default Page;