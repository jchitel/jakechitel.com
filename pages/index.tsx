import Head from 'next/head'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Jake Chitel</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>Jake Chitel</h1>
            <h2>Software Engineer</h2>

            {/* summary */}
            <p>
                I am a software engineer based in Milwaukee, Wisconsin.
                My expertise is in full-stack web development, where I am proficient in .NET and NodeJS stacks.
                I also have growing experience in iOS and Android.
                I am driven by a thirst for crafting truly awesome user experiences.
            </p>

            <h3>Contact</h3>
            <ul>
                <li>Email: jchitel@gmail.com</li>
                <li>LinkedIn: https://www.linkedin.com/in/jacob-chitel-4a395858/</li>
                <li>GitHub: https://github.com/jchitel</li>
                <li>Resume: TODO</li>
            </ul>

            <h3>Education</h3>
            <p>Marquette University - Milwaukee, Wisconsin</p>
            <p>August 2011 - May 2015</p>
            <p>Bachelor of Science - Computer Engineering</p>

            <h3>Experience</h3>

            <h4>Direct Supply, Milwaukee, Wisconsin</h4>
            <h5>Senior Software Engineer, April 2019 - Present</h5>
            <p>
                Since my promotion to Senior Engineer, I have made significant contributions in
                a project to build a new mobile application from the ground up.
                This project has leveraged modern native mobile technologies like Kotlin, Jetpack, Swift,
                and SwiftUI.
            </p>

            <h5>Software Engineer, September 2017 - April 2019</h5>
            <p>
                My initial tenure at Direct Supply saw a deepening of my skills in both React
                and C# server development. I have developed deep knowledge in code bases
                with over 20 years of legacy code, including Angular, jQuery, classic ASP,
                and VB6.
            </p>

            <h4>GE Healthcare, Waukesha, Wisconsin</h4>
            <h5>Software Engineer, April 2017 - September 2017</h5>
            <p>
                At GE Healthcare, I developed a log processor and UI used in a reliability platform
                for mobile X-Ray systems, utilizing PHP and JavaScript.
            </p>

            <h4>D+H (Now Finastra), Mequon, Wisconsin</h4>
            <h5>Software Engineer, July 2016 - April 2017</h5>
            <p>
                At D+H, I worked on a platform for online mortgage applications to be vended to banks
                and other mortgage lenders. This platform utilized a mix of modern AngularJS and ASP.NET,
                with some older VB.NET and vanilla JS.
            </p>

            <h4>Amazon, Seattle, Washington</h4>
            <h5>Software Development Engineer, June 2015 - June 2016</h5>
            <p>
                After being hired for full-time work at Amazon, I worked on the AWS Lambda Console stack,
                modernizing the frontend from AngularJS to React. The Java backend was a thin layer on top
                of the public AWS Lambda API, and also integrated with several other AWS services.
            </p>

            <h5>SDE Intern, May 2014 - August 2014</h5>
            <p>
                As an intern at Amazon, I worked in the hardlines division of the Amazon.com website,
                developing an aggregation tool for the Amazon Wireless mobile phone service. This project
                involved using Java and SQL.
            </p>

            <h4>Quad/Graphics, Sussex, Wisconsin</h4>
            <h5>Software Developer Intern, May 2013 - October 2013</h5>
            <p>
                My first ever internship at Quad/Graphics had me in a data-heavy environment, dealing with
                backend systems for warehouses. Here, I honed my C# and SQL skills, and got my first taste
                of working at a large company with many internal services communicating with each other.
            </p>

            <h4>GasDay Lab, Marquette University, Milwaukee, Wisconsin</h4>
            <h5>Software Developer, August 2011 - May 2015</h5>
            <p>
                The GasDay Lab provided my humble beginnings as a software developer. Here, I learned C#
                and SQL for the backend of a tool used by energy companies to forecast natural gas demand.
                The tool consisted of a database storing weather and gas flow data, interacting with
                a forecasting model maintained by Marquette University professors and grad students.
                Over time, I also worked on a new ASP.NET MVC Web UI for this tool (replacing a dated
                MS Excel macro), where I first learned HTML, JavaScript, and CSS.
            </p>

            <h3>Skills</h3>
            <ul>
                <li>Frontend</li>
                <ul>
                    <li>JavaScript</li>
                    <li>TypeScript</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>React</li>
                    <li>Webpack</li>
                    <li>Jest</li>
                    <li>Next.js</li>
                    <li>Angular 1.0</li>
                </ul>
                <li>Backend</li>
                <ul>
                    <li>NodeJS</li>
                    <li>C# (ASP.NET, .NET Core)</li>
                    <li>SQL (SQL Server, PostgreSQL)</li>
                    <li>RabbitMQ</li>
                    <li>AWS (Lambda, ECS, RDS, S3, DynamoDB, ...)</li>
                    <li>Java</li>
                </ul>
                <li>Mobile</li>
                <ul>
                    <li>Swift</li>
                    <li>SwiftUI</li>
                    <li>UIKit</li>
                    <li>Kotlin</li>
                    <li>Jetpack</li>
                    <li>Coroutines</li>
                    <li>RxJava</li>
                    <li>SQLite</li>
                </ul>
                <li>Concepts</li>
                <ul>
                    <li>Agile Methodologies</li>
                    <li>CI/CD</li>
                    <li>Testing (Unit, Integration, UI)</li>
                    <li>API Design</li>
                </ul>
            </ul>
        </div>
    )
}
