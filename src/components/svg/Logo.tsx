import Path, { Move } from "../../utils/svg/Path";

const Logo = () => (
    <svg width={1347} height={184} viewBox="0 0 1347 184" fill="none">
        <Path stroke="black" strokeWidth={12}>
            <Move abs to={[165, 94]} />
        </Path>
        <Path stroke="black" strokeWidth={15}>
            {}
        </Path>
    </svg>
);

export default Logo;
