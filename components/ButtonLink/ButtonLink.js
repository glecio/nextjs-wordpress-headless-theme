import Link from "next/link"

export const ButtonLink = ({destination, label}) => {
    return (
        <Link href={destination}>
        <div className="btn">
            {label}
        </div>
        </Link>
    )
}