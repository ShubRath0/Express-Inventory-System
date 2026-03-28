import { StatCard, type StatCardProps } from "../ui";

interface GenericStatBannerProps {
    stats: StatCardProps[];
}

export const GenericStatBanner = ({
    stats
}: GenericStatBannerProps) => {
    return (
        <>
            {
                stats.map((stat, index) => (
                    <StatCard
                        key={stat.statName}
                        statName={stat.statName}
                        statValue={stat.statValue}
                        render={stat.render}
                        icon={stat.icon}
                        index={index}
                    />

                ))
            }
        </>
    );
};