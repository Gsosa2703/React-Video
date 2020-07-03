/*
La mejor practica es separar los contenedores que se van a encargar de trabjar con 
nuestros componentes por eso creamos la carpeta de containers y dentro de ella cada uno de los
containers que van a tener nuestros componentes
*/

import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import Search from '../components/Search'
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem'
import Footer from '../components/Footer';
import useInitialState from '../hooks/useInitialState'
import '../assets/styles/App.scss';

const API = "http://localhost:3000/initalState";

const App = () => {
    // el primer elemento es el nombre de la variable para guardar el estado, el otro elemento me permite actualizar el estado
    //useState recibe como propiedad elementos para inicializar el estado esto puede ser un string,number,boolean,object,array
    const initalState = useInitialState(API);
    return (
        <div className="App">
            <Header />
            <Search /> 
            {initalState.mylist.length > 0 && 
              <Categories title="Mi Lista">
                <Carousel>
                    {
                        initalState.mylist.map(item =>
                            <CarouselItem  key={item.id} {...item}/>
                            )
                    }
                  
                </Carousel>
                </Categories>
 
            }
           
            <Categories title="Tendencias">
                <Carousel>
                    {
                        initalState.trends.map(item =>
                            <CarouselItem key={item.id} {...item} />
                            )
                    }
                   
                </Carousel>
            </Categories>

            <Categories title="Originales de Platzi Video">
                <Carousel>
                    {
                        initalState.originals.map(item => 
                            <CarouselItem key={item.id} {...item}/>
                            )
                    }
                 
                </Carousel>
            </Categories>
            <Footer />

        </div>
    )
};

export default App;
