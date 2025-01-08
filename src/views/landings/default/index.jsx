"use client";

// @project
import { Hero17 } from "@/blocks/hero";
import LazySection from "@/components/LazySection";
import useDataThemeMode from "@/hooks/useDataThemeMode";

// @data
import { feature18, hero } from "./data";
import { Footer7 } from "@/blocks/footer";
import Team from "./team";

/***************************  PAGE - MAIN  ***************************/

export default function Main() {
    useDataThemeMode();

    return (
        <div style={{ backgroundColor: "#ffffff" }}>
            <Hero17 {...hero} />
            <LazySection
                sections={[
                    {
                        importFunc: () =>
                            import("@/blocks/feature").then((module) => ({
                                default: module.Feature18,
                            })),
                        props: feature18,
                    },
                ]}
                offset="200px"
            />
            <Team />
            <Footer7 />
        </div>
    );
}
