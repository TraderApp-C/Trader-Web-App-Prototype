
import React, { useRef, useState } from 'react';
import Slider from "react-slick";
import './form.css';
import { useSelector } from "react-redux";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ChartSettingsSymbol from './chart_settings_symbol';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/hooks';
import ChartSettingsDate from './date_selection/chart_settings_date';
import ChartSettingsOverview from './chart_settings_overview';
import ChartType from './chart_type';


const PagerView: React.FC = () => {
    const sliderRef = useRef<Slider | null>(null);
    const [_currentIndex, setCurrentIndex] = useState(0);


    const state = useSelector((state: RootState) => state.tickerSlice)
    state;

    const dispatch = useAppDispatch();
    dispatch;

    const settings = {
        dots: true,  
        customPaging: (_i: number) => (
          <div/>
        ),
        beforeChange: (_oldIndex: number, newIndex: number) => {
          setCurrentIndex(newIndex);
        },
        arrows: false,
        infinite: false,
        draggable: false,
        speed: 500,
        slidesToShow: 1
    };

    // Handle next button click
  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext(); // Go to the next slide
    }
  };

  // Handle previous button click
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev(); // Go to the previous slide
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'}}>
    <div className='sliderForm'>
      <Slider {...settings} ref={sliderRef} adaptiveHeight={true}>
        <div >
        <ChartType normalClick={() => handleNext()}/>
      </div>
      <div style={{ backgroundColor: '#f0f0f0', padding: '16px', width: 300}}>
        <ChartSettingsSymbol onPrevious={handlePrev} onNext={handleNext}/>
      </div>
      <div style={{ backgroundColor: 'lightblue', height: '600px'}}>
      <ChartSettingsDate onPrevious={handlePrev} onNext={handleNext}/>
      </div>
      <div style={{  width: 200, alignContent: 'start'}}>
        <ChartSettingsOverview onBack={handlePrev} />
      </div>
      
    </Slider>
    </div>
    </div>
    
    
  );
};

export default PagerView;