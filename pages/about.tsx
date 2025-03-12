import { Container } from '@/components/container';
import { AppProvider } from '@/components/contexts/appContext';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Layout } from '@/components/layout';
import Head from 'next/head';
import request from 'graphql-request';
import { GetStaticProps } from 'next';
import { PublicationByHostDocument, PublicationFragment } from '@/generated/graphql';
import { ProjectsSection, TechnologiesSection, WelcomeSection } from '@/components/about/sections';
import { ExperienceSection } from '@/components/about/sections/Experience';
import { EducationSection } from '@/components/about/sections/Education';
import { AchievementsSection } from '@/components/about/sections/Achievements';

type Props = {
    publication: PublicationFragment;
};

export default function About({ publication }: Props) {
    return (
        <AppProvider publication={publication}>
            <Layout>
                <Head>
                    <title>About - Anmol Kansal</title>
                </Head>
                <Header />
                <Container className="px-5 py-8 text-slate-800 dark:text-slate-100">
                    <WelcomeSection />

                    <section id="about" className="section">
                        <div className="flex flex-col gap-3">
                            <div
                                className="text-lg font-light"
                            >
                                Welcome to my digital space! I am a full stack developer with more than 3.5 years of experience. I am currently working as a Senior Member, Tech at D.E. Shaw India Pvt. Ltd.
                            </div>
                        </div>
                    </section>

                    <TechnologiesSection />
                    <ExperienceSection />
                    <ProjectsSection />
                    <EducationSection />
                    <AchievementsSection />

                </Container>
                <Footer />
            </Layout>
        </AppProvider>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const data = await request(
        process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
        PublicationByHostDocument,
        {
            host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
        }
    );

    return {
        props: {
            publication: data.publication,
        },
        revalidate: 1,
    };
};