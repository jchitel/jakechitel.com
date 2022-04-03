import cx from "classnames";

export const Section = ({
    anchor,
    header,
    children,
}: {
    anchor?: string;
    header: string;
    children: React.ReactNode;
}) => (
    <div className="space-y-6">
        <h3 id={anchor} className="text-3xl text-gray-500">
            {header}
        </h3>
        {children}
    </div>
);

export const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-justify">{children}</p>
);

export const Box = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => (
    <div className={cx("bg-gray-800 px-4 py-3 rounded-lg", className)}>
        {children}
    </div>
);
