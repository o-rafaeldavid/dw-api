import { TypesProps, TypesPropsArray } from './_interfaces'

import all from '../../assets/icons/types/all.svg'
import normal from '../../assets/icons/types/normal.svg'
import fighting from '../../assets/icons/types/fighting.svg'
import flying from '../../assets/icons/types/flying.svg'
import poison from '../../assets/icons/types/poison.svg'
import ground from '../../assets/icons/types/ground.svg'
import rock from '../../assets/icons/types/rock.svg'
import bug from '../../assets/icons/types/bug.svg'
import ghost from '../../assets/icons/types/ghost.svg'
import steel from '../../assets/icons/types/steel.svg'
import fire from '../../assets/icons/types/fire.svg'
import water from '../../assets/icons/types/water.svg'
import grass from '../../assets/icons/types/grass.svg'
import electric from '../../assets/icons/types/electric.svg'
import psychic from '../../assets/icons/types/psychic.svg'
import ice from '../../assets/icons/types/ice.svg'
import dragon from '../../assets/icons/types/dragon.svg'
import dark from '../../assets/icons/types/dark.svg'
import fairy from '../../assets/icons/types/fairy.svg'

export const iconsSVGByName : TypesProps = {
    all,
    normal,
    fighting,
    flying,
    poison,
    ground,
    rock,
    bug,
    ghost,
    steel,
    fire,
    water,
    grass,
    electric,
    psychic,
    ice,
    dragon,
    dark,
    fairy
}

export const allTypes = Object.keys(iconsSVGByName)

export const iconsColorByName : TypesProps = {
    all: '#CEEFBD',
    normal: '#A0A29F',
    fighting: '#D3425F',
    flying: '#A1BBEC',
    poison: '#B763CF',
    ground: '#DA7C4D',
    rock: '#C9BC8A',
    bug: '#92BD2D',
    ghost: '#5F6DBC',
    steel: '#5795A3',
    fire: '#FBA64C',
    water: '#539DDF',
    grass: '#60BD58',
    electric: '#F2D94E',
    psychic: '#FA8582',
    ice: '#76D1C1',
    dragon: '#0C6AC8',
    dark: '#595761',
    fairy: '#EF90E6'
}

export const iconsGradientColorsByName : TypesPropsArray = {
    all:            ['#CCF0FA', '#DEF4D3'],
    normal:         ['#A0A29F', '#bbbfb8'],
    fighting:       ['#D94256', '#E54348'],
    flying:         ['#93ABDD', '#A2BDED'],
    poison:         ['#A964C8', '#C161D3'],
    ground:         ['#D78555', '#D29463'],
    rock:           ['#C9BC8A', '#a39271'],
    bug:            ['#93BC2C', '#9ccf5a'],
    ghost:          ['#5F6DBC', '#5760b5'],
    steel:          ['#52879D', '#58A5A9'],
    fire:           ['#FB9C50', '#FBAE46'],
    water:          ['#559EDF', '#69B9E3'],
    grass:          ['#5DBE62', '#5AC177'],
    electric:       ['#FAD742', '#FBE885'],
    psychic:        ['#FA8582', '#e8566e'],
    ice:            ['#76D1C1', '#87e6de'],
    dragon:         ['#0773C7', '#218dda'],
    dark:           ['#595762', '#6E7587'],
    fairy:          ['#EC8CE5', '#F3A7E7']
}

export const iconsGradientByName : TypesProps = {
    all:            'linear-gradient(45deg, #CCF0FA 0%, #DEF4D3 100%)',
    normal:         'linear-gradient(45deg, #A0A29F 0%, #bbbfb8 100%)',
    fighting:       'linear-gradient(45deg, #D94256 0%, #E54348 100%)',
    flying:         'linear-gradient(45deg, #93ABDD 0%, #A2BDED 100%)',
    poison:         'linear-gradient(45deg, #A964C8 0%, #C161D3 100%)',
    ground:         'linear-gradient(45deg, #D78555 0%, #D29463 100%)',
    rock:           'linear-gradient(45deg, #C9BC8A 0%, #a39271 100%)',
    bug:            'linear-gradient(45deg, #93BC2C 0%, #9ccf5a 100%)',
    ghost:          'linear-gradient(45deg, #5F6DBC 0%, #5760b5 100%)',
    steel:          'linear-gradient(45deg, #52879D 0%, #58A5A9 100%)',
    fire:           'linear-gradient(45deg, #FB9C50 0%, #FBAE46 100%)',
    water:          'linear-gradient(45deg, #559EDF 0%, #69B9E3 100%)',
    grass:          'linear-gradient(45deg, #5DBE62 0%, #5AC177 100%)',
    electric:       'linear-gradient(45deg, #FAD742 0%, #FBE885 100%)',
    psychic:        'linear-gradient(45deg, #FA8582 0%, #e8566e 100%)',
    ice:            'linear-gradient(45deg, #76D1C1 0%, #87e6de 100%)',
    dragon:         'linear-gradient(45deg, #0773C7 0%, #218dda 100%)',
    dark:           'linear-gradient(45deg, #595762 0%, #6E7587 100%)',
    fairy:          'linear-gradient(45deg, #EC8CE5 0%, #F3A7E7 100%)'
}