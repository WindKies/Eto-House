'use client';

import Container from "../Container";

import {TbBeach, TbMountain, TbPool} from 'react-icons/tb';
import {
    GiBarn, 
    GiBoatFishing, 
    GiCactus, 
    GiCastle, 
    GiCaveEntrance, 
    GiForestCamp, 
    GiIsland, 
    GiWindmill} from 'react-icons/gi';
import {MdOutlineVilla} from 'react-icons/md';
import {FaSkiing} from 'react-icons/fa';
import {BsSnow} from 'react-icons/bs';
import {IoDiamond} from 'react-icons/io5';
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";


export const categories = [
    {
        label: 'Bãi biển',
        icon: TbBeach,
        description: 'Vị trí này gần bãi biển!'
    },
    {
        label: 'Cối xay gió',
        icon: GiWindmill,
        description: 'Vị trí này có cối xay gió!'
    },
    {
        label: 'Biệt thự',
        icon: MdOutlineVilla,
        description: 'Vị trí này có đầy đủ tiện nghi hiện đại!'
    },
    {
        label: 'Nhà nông thôn',
        icon: TbMountain,
        description: 'Vị trí này ở vùng nông thôn!'
    },
    {
        label: 'Hồ bơi',
        icon: TbPool,
        description: 'Vị trí này có bể bơi!'
    },
    {
        label: 'Nhiệt đới',
        icon: GiIsland,
        description: 'Vị trí này nằm trên một hòn đảo!'
    },
    {
        label: 'Hồ',
        icon: GiBoatFishing,
        description: 'Vị trí này nằm gần hồ!'
    },
    {
        label: 'Trượt tuyết',
        icon: FaSkiing,
        description: 'Vị trí này có hoạt động trượt tuyết!'
    },
    {
        label: 'Lâu đài',
        icon: GiCastle,
        description: 'Vị trí này nằm trong một tòa lâu đài!'
    },
    {
        label: 'Cắm trại',
        icon: GiForestCamp,
        description: 'Vị trí này có hoạt động cắm trại!'
    },
    {
        label: 'Bắc cực',
        icon: BsSnow,
        description: 'Vị trí này nằm ở Bắc cực!'
    },
    {
        label: 'Hang động',
        icon: GiCaveEntrance,
        description: 'Vị trí này nằm trong hang động!'
    },
    {
        label: 'Sa mạc',
        icon: GiCactus,
        description: 'Vị trí này nằm trong sa mạc!'
    },
    {
        label: 'Cưỡi ngựa',
        icon: GiBarn,
        description: 'Vị trí này có hoạt động cưỡi ngựa!'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'Vị trí này rất sang trọng!'
    },



    
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname == '/';

    if(!isMainPage){
        return null;
    }

    return (
        <Container>
            <div
              className="
                pt-4
                
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto">
            {categories.map((item)=>(
                <CategoryBox
                  key={item.label}
                  label={item.label}
                  selected={category == item.label}
                  icon={item.icon}
                />
            ))}
            </div>
        </Container>
    );
}

export default Categories;