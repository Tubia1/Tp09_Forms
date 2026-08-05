import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import App from '../App';

export default function App ()
{
   const [camposForm,setFormularios] = useState(
   {
       nombreEquipo: '',
    nombreCapitan: '',
    email: '',
    telefono: '',
    categoria: '',

   }
   
   )
}