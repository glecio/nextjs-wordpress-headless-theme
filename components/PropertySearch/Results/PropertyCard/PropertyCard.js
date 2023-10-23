import Link from "next/link"
import Image from "next/image"
import numeral from "numeral"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBathtub, faBed, faCar, faCat } from "@fortawesome/free-solid-svg-icons"

export const PropertyCard = ({title, destination, image, bedrooms, bathrooms, hasParking, petFriendly, price }) => {
    return (
        <Link href={destination} className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200">
            <div className="flex w-full h-64">
                <Image 
                    src={image} 
                    height={200}
                    width={300} 
                    style={{objectFit: "cover", color: "red"}} 
                    alt="Image of property"
                />
            </div>
            <div className="mt-3 text-lg font-bold">{title}</div>
            <div className="text-lg">R$ {numeral(price).format("0.0")}</div>
            <div className="flex justify-between text-sm mt-3">
               <div>
                    <FontAwesomeIcon icon={faBathtub}/>
                    <span className="pl-2">
                        {bathrooms} bathrooms
                    </span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faBed}/>
                    <span className="pl-2">
                        {bedrooms} bedrooms
                    </span>
                </div>
            </div>
            {(!!hasParking || !!petFriendly) && <div className="flex justify-between text-sm mt-3">
                <div>
                    {!!hasParking &&
                    <>
                        <FontAwesomeIcon icon={faCar} /> parking avaiable
                    </>

                    }
                </div>
                <div>
                {!!petFriendly &&
                    <>
                        <FontAwesomeIcon icon={faCat} /> pet friendly
                    </>

                    }
                </div>
            </div>}
            <div className="">{hasParking}</div>
            <div className="">{petFriendly}</div>
        </Link>
    )
}