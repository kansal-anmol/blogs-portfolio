export type Project = {
    poster: string;
    images: string[];
    _id: string;
    stack: string[];
    category: string;
    liveUrl: string;
    repoUrl: string;
    createdAt: string;
    description: string;
    title: string;
};

export const PROJECTS: Array<Project> = [
    {
        poster: "/assets/projects/perfecto/home_page.png",
        images: [
            "/assets/projects/perfecto/home_page.png",
            "/assets/projects/perfecto/contact_us_page.png",
            "/assets/projects/perfecto/blogs_page.png",
            "/assets/projects/perfecto/menu_page.png"
        ],
        _id: "ea6e915f-8b0b-4995-9aa7-ddc70cf3f09a",
        stack: [
            "TypeScript",
            "React",
            "Next",
            "Chakra UI",
            "GraphQL",
            "Node.js",
            "Prisma",
            "PlanetScale DB"
        ],
        category: "Next",
        liveUrl: "https://perfecto.vercel.app/",
        repoUrl: "https://github.com/kansalanmol0609/perfecto",
        createdAt: "2023-05-20",
        description:
            "A full-stack restaurant app using Next.js, TypeScript, GraphQL, Node.js, Prisma, PlanetScale DB. Implemented user authentication, order placement, and tracking for customer users. Designed admin functionalities, including food item management, table bookings, and newsletter distribution",
        title: "Perfecto"
    },
    {
        poster: "/assets/projects/chessCube/home_page.png",
        images: [
            "/assets/projects/chessCube/home_page.png",
            "/assets/projects/chessCube/multi_player_page.png",
            "/assets/projects/chessCube/single_player_page.png"
        ],
        _id: "ea6e915f-8b0b-4995-9aa7-ddc70cf3f0234",
        stack: ["JavaScript", "Semantic UI", "Node.js", "Socket.io"],
        category: "JavaScript",
        liveUrl: "https://online-multiplayer-chess-seven.vercel.app/",
        repoUrl: "https://github.com/kansalanmol0609/Online-Multiplayer-Chess",
        createdAt: "2020-03-30",
        description:
            "Developed an online multiplayer chess application using chess.js, socket.io and chessboard API. This application is proof of concept of how apps used to manage interactive states before state management libraries like React & Angular came into picture",
        title: "Chess Cube"
    },
    {
        poster: "/assets/projects/mediumClone/home_page.png",
        images: [
            "/assets/projects/mediumClone/home_page.png",
            "/assets/projects/mediumClone/blog_page.png",
            "/assets/projects/mediumClone/blog_comments.png"
        ],
        _id: "ea6e915f-8b0b-4995-9aa7-ddc70cf3f0212",
        stack: ["JavaScript", "TailwindCSS", "React", "Next", "Sanity.io"],
        category: "Next",
        liveUrl: "https://medium-clone-jet-phi.vercel.app/",
        repoUrl: "https://github.com/kansalanmol0609/medium-clone",
        createdAt: "2022-06-04",
        description:
            "Developed a medium clone using Sanity.io, React, GraphQL. This application is proof of concept of how apps used to manage interactive states before state management libraries like React & Angular came into picture",
        title: "Medium Clone"
    },
    {
        poster: "/assets/projects/parikshaVani/home_page.png",
        images: [
            "/assets/projects/parikshaVani/home_page.png",
            "/assets/projects/parikshaVani/admin_page.png",
            "/assets/projects/parikshaVani/questions_page.png",
            "/assets/projects/parikshaVani/exam_page.png"
        ],
        _id: "ea6e915f-8b0b-4995-9aa7-ddc70cf3f01239",
        stack: ["TypeScript", "React", "Next", "Chakra UI", "GraphQL", "Node.js", "Prisma", "MongoDB"],
        category: "Next",
        liveUrl: "https://pariksha-vani.vercel.app/",
        repoUrl: "https://github.com/kansalanmol0609/pariksha-vani",
        createdAt: "2023-12-25",
        description:
            "A full-stack web app dedicated to empowering Indian students in their government exam preparations. Pariksha Vani ensures a comprehensive and effective study experience for aspirants seeking to excel in various government examinations. Designed admin functionalities, including exams, questions and topic tags management",
        title: "Pariksha Vani"
    }
];
