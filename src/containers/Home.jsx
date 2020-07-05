/*
La mejor practica es separar los contenedores que se van a encargar de trabjar con 
nuestros componentes por eso creamos la carpeta de containers y dentro de ella cada uno de los
containers que van a tener nuestros componentes
*/

import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import Search from '../components/Search'
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem'
import useInitialState from '../hooks/useInitialState'
import '../assets/styles/App.scss';


//const API = "http://localhost:3000/initalState";

const Home = ({mylist, trends,originals}) => {
    // el primer elemento es el nombre de la variable para guardar el estado, el otro elemento me permite actualizar el estado
    //useState recibe como propiedad elementos para inicializar el estado esto puede ser un string,number,boolean,object,array
   // const initalState = useInitialState(API);
    return (
        <>
            <Search /> 
            {mylist.length > 0 && 
              <Categories title="Mi Lista">
                <Carousel>
                    {
                        mylist.map(item =>
                            <CarouselItem  key={item.id} {...item}/>
                            )
                    }
                  
                </Carousel>
                </Categories>
 
            }
           
            <Categories title="Tendencias">
                <Carousel>
                    {
                        trends.map(item =>
                            <CarouselItem key={item.id} {...item} />
                            )
                    }
                   
                </Carousel>
            </Categories>

            <Categories title="Originales de Platzi Video">
                <Carousel>
                    {
                        originals.map(item => 
                            <CarouselItem key={item.id} {...item}/>
                            )
                    }
                 
                </Carousel>
            </Categories>

        </>
    )
};

const mapStateToProps = state => {
    return {
        mylist: state.mylist,
        trends: state.trends,
        originals: state.originals
    }
}
export default connect(mapStateToProps, null)(Home)