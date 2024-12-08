import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography
} from '@mui/material';
import '../css/card.css';
import "@fontsource/raleway";
import mobileDivider from '/pattern-divider-mobile.svg'
import desktopDivider from '/pattern-divider-desktop.svg'
import dice from '/icon-dice.svg'
import { cardio } from 'ldrs'







const BasicGrid22 = () => {
    cardio.register()
    const [count, setCount] = useState(1)
    const [advice, setAdvice] = useState('Roll the dice for some advice!');
    const [loading, setLoading] = useState(false);
   
    const fetchAdvice = async () => {
        setLoading(true);
        try {
          const response = await fetch('https://api.adviceslip.com/advice');
          if (!response.ok) {
            throw new Error('Failed to fetch advice');
          }
          const data = await response.json();
          setAdvice(data.slip.advice);
        } catch (error) {
          console.error('Error fetching advice:', error);
          setAdvice('Failed to fetch advice. Try again later.');
        } finally {
          setLoading(false);
        }
      };

    return (
        <div className='feed'>

            <Card className='card' sx={{
                position: 'relative',
                overflow: 'visible'
            }}>
                <CardContent>

                    <Typography className='first' component="div" sx={{
                        color: '#4BD495',
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        display: 'flex'
                    }}>
                        ADVICE #{count}
                    </Typography>
                    <br />
                    <Typography sx={{
                        mt: 1,
                        color: '#CEE3EA',
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                         {loading ? <l-cardio
  size="60"
  stroke="5"
  speed="0.5" 
  color="#4BD495" 
></l-cardio> : advice} 
                    </Typography>

                    <br />
                    <Box sx={{
                        display: { md: 'none', xs: 'flex', sm: 'flex' },
                        justifyContent: 'center'
                    }}>
                        <img src={mobileDivider} className="mdivider" />
                    </Box>
                    <Box sx={{
                        display: { sm: 'none', xs: 'none', md: 'flex' },
                        justifyContent: 'center'
                    }}>
                        <img src={desktopDivider} className="ddivider" />
                    </Box>
                    <br />

                    <Button
                        className='feedSubmit'
                        variant="contained"
                        sx={{
                            backgroundColor: '#4BD495',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                            height: '60px',
                            width: '30px',
                            position: 'absolute',
                            bottom: '-30px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                            cursor: 'pointer',
                            transition: 'box-shadow 0.3s ease, transform 0.3s ease'
                        }}
                        onClick={() => {setCount((count) => count + 1); fetchAdvice();}}

                    >
                        <img src={dice} className='dice' alt="" />
                    </Button>

                </CardContent>
            </Card>

        </div>
    );
};

export default BasicGrid22;