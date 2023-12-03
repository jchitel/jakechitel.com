import AboutMe from "./about-me.mdx";

export default function About() {
    return (
        <div className="max-w-prose mx-auto pt-20 pb-10">
            <h1 className="text-5xl">About Me!</h1>
            <p className="pb-6 text-slate-500 dark:text-slate-400">
                Last updated: 2023-09-07
            </p>

            <AboutMe />

            <h2 className="text-3xl pt-4">Work History</h2>
            <p className="pb-6 text-slate-500 dark:text-slate-400">
                (Most Recent First)
            </p>

            {workHistory.map((item) => (
                <WorkHistoryItem key={item.timeRange} {...item} />
            ))}
        </div>
    );
}

const workHistory = [
    {
        title: "Staff Software Engineer",
        timeRange: "June 2022 - Present",
        company: "Direct Supply",
        location: "Milwaukee, Wisconsin",
    },
    {
        title: "Software Engineer IV",
        timeRange: "June 2021 - June 2022",
        company: "Arch Capital Group",
        location: "Remote",
    },
    {
        title: "Senior Software Engineer",
        timeRange: "April 2019 - June 2021",
        company: "Direct Supply",
        location: "Milwaukee, Wisconsin",
    },
    {
        title: "Software Engineer",
        timeRange: "September 2017 - April 2019",
        company: "Direct Supply",
        location: "Milwaukee, Wisconsin",
    },
    {
        title: "Software Engineer",
        timeRange: "April 2017 - September 2017",
        company: "GE Healthcare",
        location: "Waukesha, Wisconsin",
    },
    {
        title: "Software Engineer",
        timeRange: "July 2016 - April 2017",
        company: "D+H Mortgagebot (Now Finastra)",
        location: "Mequon, Wisconsin",
    },
    {
        title: "Software Development Engineer",
        timeRange: "June 2015 - June 2016",
        company: "Amazon",
        location: "Seattle, Washington",
    },
    {
        title: "Software Developer",
        timeRange: "August 2011 - May 2015",
        company: "GasDay Lab (Now Marquette Energy Analytics)",
        location: "Milwaukee, Wisconsin",
    },
    {
        title: "Software Development Engineer Intern",
        timeRange: "May 2014 - August 2014",
        company: "Amazon",
        location: "Seattle, Washington",
    },
    {
        title: "Software Developer Intern",
        timeRange: "May 2013 - October 2013",
        company: "Quad/Graphics",
        location: "Sussex, Wisconsin",
    },
];

type WorkHistoryItemProps = {
    title: string;
    timeRange: string;
    company: string;
    location: string;
};

function WorkHistoryItem({
    title,
    timeRange,
    company,
    location,
}: WorkHistoryItemProps) {
    return (
        <p className="pb-4">
            <strong>{title}</strong>{" "}
            <span className="text-slate-500 dark:text-slate-400">
                {timeRange}
            </span>
            <br />
            <strong>{company}</strong>{" "}
            <span className="text-slate-500 dark:text-slate-400">
                {location}
            </span>
        </p>
    );
}
