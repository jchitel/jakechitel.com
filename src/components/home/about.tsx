import { Section, Box, Paragraph } from "./common";

export const About = () => (
    <Section anchor="about" header="About Me">
        <Box className="space-y-4">
            <Paragraph>
                I have had a passion for computers for as long as I can
                remember. So naturally, I decided to be a brain surgeon and set
                my sights on med school. Fortunately in high school, I had the
                opportunity to take a course on digital electronics, which got
                me back on the right track. From there, it was a short skip,
                step, and a hop to learn Java, and the wonderful world of
                software was open to me.
            </Paragraph>
            <Paragraph>
                After high school I enrolled in the Computer Engineering program
                at Marquette University. I had been gravitating toward software,
                but I wanted to be well-rounded, so I got a nice balance of
                hardware, too. My favorite courses were Operating Systems,
                Computer Architecture, Networks, and most of all, Compilers.
                It&apos;s a long term goal of mine to build a compiler for a
                language of my very own.
            </Paragraph>
            <Paragraph>
                I was extremely fortunate to get a development job at
                Marquette&apos;s GasDay Lab when I was just a freshman. It was
                here that I gained valuable experience on the job as an actual
                developer, including unit testing, agile development, and
                version control. This experience helped me to gain two
                internships during my undergrad, the latter at Amazon in
                Seattle, which scored me a full-time gig there after graduating.
            </Paragraph>
            <Paragraph>
                It was at Amazon that I gained a passion for frontend web
                development, working on the AWS Lambda Console. After a year
                there, I discovered that living 2000 miles from my family was
                not my cup of tea, so I said farewell to Seattle and returned to
                my roots back in Milwaukee. Since returning home, I&apos;ve had
                some wonderful experiences, most notably at Direct Supply, where
                I had the opportunity to rebuild a native mobile app from the
                ground up.
            </Paragraph>
            <Paragraph>
                Today, I&apos;m working remote full-time at Ventus Risk, where
                I&apos;m hoping to get some valuable experience with Python and
                continue advancing my React skills. Stay tuned for more
                developments here!
            </Paragraph>
        </Box>
    </Section>
);

export const Education = () => (
    <Section header="Education">
        <Box>
            <p className="font-bold">
                Marquette University - Milwaukee, Wisconsin
            </p>
            <p>August 2011 - May 2015</p>
            <p>Bachelor of Science - Computer Engineering</p>
        </Box>
    </Section>
);
