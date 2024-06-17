import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="bg-white h-20 relative">
        <MaxWidthWrapper>
            <div className="border-t border-gray-200" />

            <div className="h-full flex flex-col justify-center items-center">
                <div className="text-center md:text-left pb-2 md:pb-0">
                    <p className="text-sm text-muted-foreground">
                        &copy; 2024 CaseCobra. All rights reserved.
                    </p>
                </div>
            </div>    
        </MaxWidthWrapper>
    </footer>
  );
}

export default Footer;