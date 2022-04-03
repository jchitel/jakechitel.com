import { Section, Box } from "./common";

export const Skills = () => (
    <Section anchor="skills" header="Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SkillCategory
                header="Frontend"
                skills={[
                    "JavaScript",
                    "TypeScript",
                    "HTML",
                    "CSS",
                    "React",
                    "Webpack",
                    "Jest",
                    "Next.js",
                    "Angular 1.0",
                ]}
            />
            <SkillCategory
                header="Backend"
                skills={[
                    "NodeJS",
                    "C# (ASP.NET, .NET Core)",
                    "SQL (SQL Server, PostgreSQL)",
                    "RabbitMQ",
                    "AWS (Lambda, ECS, RDS, S3, DynamoDB, ...)",
                    "Python",
                    "Docker",
                    "Java",
                ]}
            />
            <SkillCategory
                header="Mobile"
                skills={[
                    "Swift",
                    "SwiftUI",
                    "UIKit",
                    "Kotlin",
                    "Jetpack",
                    "Coroutines",
                    "RxJava",
                    "SQLite",
                ]}
            />
            <SkillCategory
                header="Concepts"
                skills={[
                    "Software Design",
                    "Version Control",
                    "Agile Methodologies",
                    "CI/CD",
                    "Testing (Unit, Integration, UI)",
                    "API Design",
                ]}
            />
        </div>
    </Section>
);

const SkillCategory = ({
    header,
    skills,
}: {
    header: string;
    skills: string[];
}) => (
    <div className="space-y-2 flex flex-col">
        <h4 className="text-xl text-gray-400">{header}</h4>
        <Box className="flex-auto">
            {skills.map((s, i) => (
                <div key={i}>{s}</div>
            ))}
        </Box>
    </div>
);
