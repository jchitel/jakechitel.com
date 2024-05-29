import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { SimpleLayout } from "@/components/SimpleLayout";

function ToolsSection({
    children,
    ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
    return (
        <Section {...props}>
            <ul role="list" className="space-y-16">
                {children}
            </ul>
        </Section>
    );
}

function Tool({
    title,
    href,
    children,
}: {
    title: string;
    href?: string;
    children: React.ReactNode;
}) {
    return (
        <Card as="li">
            <Card.Title as="h3" href={href}>
                {title}
            </Card.Title>
            <Card.Description>{children}</Card.Description>
        </Card>
    );
}

export const metadata = {
    title: "Uses",
    description: "Stuff and things I own and use!",
};

export default function Uses() {
    return (
        <SimpleLayout
            title={metadata.description}
            intro="No personal site is complete without a Uses page. Here's my collection in its raw glory."
        >
            <div className="space-y-20">
                <ToolsSection title="Workstation">
                    <Tool title="16-inch MacBook Pro (2023), M2 Pro, 16GB RAM">
                        I&apos;ve been a proud Mac user since 2011, starting
                        with my Early-2011 15-inch MacBook Pro that I (my
                        parents) bought for college. After graudating from
                        college, I treated myself (with my own money this time!)
                        to a new Mid-2015 15-inch Retina MacBook Pro, which
                        lasted me 8 years, despite showing its age for most of
                        the last 3. Last year I finally decided to upgrade to
                        Apple Silicon, and I am extremely impressed so far.
                        Hopefully this one will last me at least another 8
                        years...
                    </Tool>
                    <Tool title="LG 32UL500-W (32-inch, 4k) x2">
                        To be honest, I didn&apos;t really put much thought into
                        this decision, I just wanted to finally hop on the 4k
                        train and found these on Amazon. They&apos;ve worked
                        fine for the ~2 years I&apos;ve had them, despite some
                        color issues. At some point if I find myself with some
                        extra cash I might get some Apple displays, but
                        it&apos;s been hard to justify the expense.
                    </Tool>
                    <Tool title="Apple Magic Keyboard with Touch ID and Numeric Keypad">
                        Until recently I thought that to be &quot;legit&quot; I
                        needed a fancy clickety-clacking mechanical keyboard,
                        but I never had an issue with the keyboard on my
                        MacBook. I heard stirrings of positivity from people
                        that used the wireless version, so I decided to take it
                        for a spin. I find that I spend significantly less time
                        and energy thinking about my keyboard (except when the
                        battery dies). If you have a workspace that you
                        sometimes connect to your MacBook, I highly recommend
                        this keyboard.
                    </Tool>
                    <Tool title="Apple Magic Trackpad">
                        Similarly to the keyboard, I&apos;ve always loved the
                        trackpad on MacBooks. When I got the keyboard, I decided
                        to just get the trackpad too. I went from occasional
                        wrist discomfort with the mouse I used to use, to
                        exactly zero discomfort with the trackpad. The only
                        minus is that it kinda sucks for gaming, so I still have
                        a generic wired mouse that I use when needed.
                    </Tool>
                    <Tool title="UPLIFT Curved Corner Standing Desk">
                        This is my luxury pick. I absolutely love this desk. I
                        could probably use it in standing mode more often, but
                        it&apos;s nice to have the option. The biggest plus is
                        the sheer size of this desk. I have so much more room
                        for the endless piles of mail that I never want to go
                        through.
                    </Tool>
                </ToolsSection>
                <ToolsSection title="Development tools">
                    <Tool title="Visual Studio Code">
                        Like many other developers, around 2016 I put away my
                        Visual Studio and IntelliJ, skeptically picked up this
                        VS Code thing that everyone was going on about, fell in
                        love, and never went back. Occasionally I run into
                        issues, but it&apos;s still by far the smoothest
                        development experience I&apos;ve ever had, and
                        it&apos;ll take a lot to get me to switch to something
                        else.
                    </Tool>
                    <Tool title="Warp (sometimes)">
                        For a long time I was a native macOS terminal user, then
                        an iTerm2 user. I&apos;ve gained a lot of comfort in the
                        command line since my wide-eyed high school self first
                        opened a terminal, but I&apos;ve still always hated the
                        general UX of it. I&apos;ve been using Warp for a bit
                        now, and it makes me hate the command line a bit less,
                        which is actually some pretty glowing praise. There are
                        a lot of features in Warp that I&apos;m vaguely aware of
                        but never use, and learning about them has been hovering
                        somewhere pretty low on my list of priorities for a
                        while, so maybe one day I&apos;ll get there. Having said
                        all that, 95% of the time I just use the embedded
                        terminal in VS Code because I can&apos;t be bothered to
                        switch windows...
                    </Tool>
                    <Tool title="Obsidian">
                        For years my &quot;second brain&quot; was always just ad
                        hoc markdown files that I opened in projects which
                        always ended up being deleted or forgotten. When I first
                        heard of Obsidian, this seemed like the perfect place
                        for this sort of thing, and it&apos;s fit the bill
                        pretty well so far. Like Warp, I could probably learn
                        how to use it more productively, but it&apos;s nice to
                        have in the background when I need it.
                    </Tool>
                </ToolsSection>
            </div>
        </SimpleLayout>
    );
}
