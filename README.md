# jakechitel.com

Repo storing the code and deploy configuration for my personal website

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `pages/index.js`. The page
auto-updates as you edit the file.

## Basic Structure

I plan to use technologies for my website that are probably a bit overkill, but
I plan to add many side projects to the site over time that may gain more
frequent usage, so it can certainly benefit from the extra scalability.

### Infrastructure

From the infrastructure side, I'll be leveraging as many AWS technologies as I
can, most notably:

-   Route53: for DNS and routing
-   EC2 w/ ASG: for hosting and auto-scaling
-   ECS (and possibly Fargate): for dockerization and deployment/spinup
-   ELB: for load balancing the auto-scaling group

The basic process is that when someone hits my site, the configured Route53
records will route traffic to my load balancer. Since I plan on hosting the
entire site in one application, an application load balancer (ALB) is not
necessary, just a network load balancer (NLB) to manage routing to hosts in my
auto-scaling group. As traffic grows, more hosts in the auto-scaling group will
spin up, giving the load balancer more hosts to distribute traffic between. My
application will be dockerized using ECS, so when a server is spun up, it will
simply install the docker image to it.

The above is currently just a plan, and it may be a bit redundant (for example,
something like ECS or ELB may already provide auto-scaling functionality out of
the box).

What I won't need (yet):

-   Message brokering: I don't plan to be dispatching any messages for anything
    I'm building at the moment, but AWS provides plenty of tools for this.
-   Data storage: Initially, this website won't be storing any data, and all
    information will be generated on-demand and stored in the browser if need
    be. Eventually, I may need some sort of persistence, at which point I will
    likely use RDS or DynamoDB, depending on the use case.

Whatever my setup ends up being, it will be configured with Terraform, which
allows me to store my infrastructure configuration as code in my repository.
This Terraform configuration will be executed by a CircleCI deployment process.

### Architecture

I plan to use the following technologies to build the site:

-   React 16.8 (the one with hooks): I still favor React when it comes to web
    frameworks, even though Vue is gaining popularity. I'll do without Redux to
    start out, firstly because it is recommended to do so, secondly because
    hooks may make it easier to build large-scale apps without needing something
    like Redux.
-   Next.js: I've heard a lot of cool stuff about Next.js as a framework for
    building server-side rendered websites, but haven't had a chance to use it
    yet. This is another piece of the puzzle that will require me to use React.
-   TypeScript: I've grown quite fond of TypeScript ever since I started using
    it. Next.js uses Webpack behind the scenes, which supports TypeScript, and
    I've configured TypeScript for Next.js stuff at work, so I foresee no issues
    here.
-   CSS-in-JS: Next.js comes bundled with CSS-in-JS tools, and I plan to
    leverage these.
-   Material-UI: I've heard a lot of great things about Material UI, but again
    haven't had the chance to use them.
-   Jest: I've used this test framework many times with great success. I don't
    plan to change this now.
-   Koa: On the server side, I prefer the lightweight architecture provided by
    Koa.

### Deployment

My CircleCI deployment process will:

-   Test the code
-   Build the Next.js app
-   Build a new Docker image containing the app
-   Run the Terraform deployment to upload the new container version and update
    ECS with the new container

## Decisions Made

### CSS-in-JS

I prefer CSS-in-JS strategies because it means I only have to deal with JS, and
it makes certain configurations simpler.

Having said that, there are 12 million options for CSS-in-JS today. I used
[this list](http://michelebertoli.github.io/css-in-js/) to determine what's out
there, filtering for the following requirements:

-   Automatic Vendor Prefixing
-   Pseudo Classes
-   Media Queries

The first requirement is to make things easier on me, the latter two are both to
ensure that I have the full capabilities of CSS available.

I then filtered out libraries that haven't been updated in the last 3 months,
and libraries with too few GitHub stars, yielding the following list (sorted by
GitHub stars):

| Package           | GitHub Stars | Last Updated (as of 2019/03/01) |
| ----------------- | ------------ | ------------------------------- |
| styled-components | 22394        | 2019/01/30                      |
| emotion           | 7144         | 2019/02/28                      |
| radium            | 6845         | 2018/12/16                      |
| react-jss         | 4621         | 2019/02/27                      |
| aphrodite         | 4567         | 2019/02/21                      |
| styled-jsx        | 4147         | 2019/02/12                      |
| linaria           | 3165         | 2019/03/01                      |
| styletron-react   | 2650         | 2019/02/27                      |
| react-fela        | 1549         | 2019/02/22                      |

I ended up opting with styled-components because it had the most elegant API and
highest community support.

The only drawback was that I now have to include Babel in the build pipeline.
However, this was probably necessary because the custom Next.js babel loader
includes a lot of other features necessary to make the SSR work properly.
