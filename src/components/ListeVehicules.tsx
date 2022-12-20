import {
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton,
    IonPage,
    IonCol,
    IonGrid,
    IonRow,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
    IonLabel,
    IonInput,
    IonModal,
    IonButtons,
    IonImg
} from '@ionic/react';
import { useRef, useState } from 'react';
import { baseUrl } from '../hooks/BaseUrl';
import { OverlayEventDetail } from '@ionic/core/components';


import useData from "./getData";
import Login from './Login';
import React from 'react';



const ListeVehicules: React.FC = () => {

    const fileInput = useRef(null);

    const modal = useRef<HTMLIonModalElement>(null);


    // Base 64
    const [imageBase64, setImageBase64] = useState<string>("");


    const input = useRef<HTMLIonInputElement>(null);


    const [message, setMessage] = useState(
        'This modal example uses triggers to automatically open a modal when the button is clicked.'
    );

    function confirm() {
        if (localStorage.getItem('token')) {
            console.log('dina');
            setIsDisabled(false);
            setisModalOpen(false);
        }
        else {
            setisModalOpen(true);
        }
    }
    const voir = () => {
        if (localStorage.getItem('token')) {
            console.log('misy token');
            console.log(localStorage.getItem('token'));
        }
        else {
            console.log('tsisy token');
            setIsDisabled(true);
            setisModalOpen(true);
        }
    };

    const state = {
        imageBase64: ''
    };
    // setState({ imageBase64: e.target.result });


    // setState({ imageBase64: e.target.result });



    const onFileChange = (event: any) => {
        console.log('onfileChange');
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log("photo en base 64");
            console.log(e.target?.result);
            if (typeof e.target?.result === 'string') {
                // Mettez à jour la valeur de imageBase64 dans l'état de votre composant avec le résultat de la conversion
                setImageBase64(e.target.result);
                console.log('ok');
                console.log(e.target.result);

            }
        };

        reader.readAsDataURL(file);

    };

    const [isDisabled, setIsDisabled] = useState(true);
    const [isModalOpen, setisModalOpen] = useState(false);



    const { data, error } = useData(baseUrl("/avions"));

    if (!data) {
        return <h1>Loading...</h1>;
    } else {
        return (


            <><IonGrid>
                {/* <IonButton onClick={voirTout}>Bouton</IonButton> */}
                <IonRow>
                    {data.map(item => {
                        return (
                            <><IonAccordionGroup onClick={voir} expand="inset" id="open-modal" disabled={isDisabled}>
                                <IonAccordion>
                                    <IonItem slot="header" color="dark">
                                        <IonLabel><h2>{item.immatriculation}</h2></IonLabel>
                                    </IonItem>
                                    <div className="ion-padding" slot="content">
                                        <IonImg src={item.imageavion} ></IonImg>
                                        <p>{item.marque} {item.modele}</p>
                                        {/* <p>acquisition: {item.acquisition}</p> */}
                                        <p>à  {item.kilometrageentree} km</p>
                                        <>
                                            <input
                                                ref={fileInput}
                                                hidden
                                                type="file"
                                                accept="image/*"
                                                onChange={onFileChange}
                                                onClick={() => {
                                                }}
                                            />
                                            <IonButton
                                                color="primary"
                                                onClick={() => {
                                                    // @ts-ignore
                                                    fileInput?.current?.click();
                                                    // setBackgroundOption(BackgroundOptionType.Gradient);
                                                }}>
                                                Changer l'image
                                            </IonButton>
                                        </>
                                    </div>


                                </IonAccordion>
                            </IonAccordionGroup>
                                <IonCol size='10'>
                                </IonCol>

                            </>
                        );
                    })}
                </IonRow>
            </IonGrid>
                {/* Ion Modal */}
                <IonModal isOpen={isModalOpen}
                //  onWillDismiss={(ev) => onWillDismiss(ev)}
                >
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                            </IonButtons>
                            <IonTitle>Log in</IonTitle>
                            <IonButtons slot="end">
                                <IonButton strong={true} onClick={() => confirm()}>
                                    Confirm
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <Login></Login>
                    {/* <IonContent className="ion-padding">
                        <IonItem>
                            <IonLabel position="stacked">Enter your name</IonLabel>
                            <IonInput ref={input} type="text" placeholder="Your name" />
                        </IonItem>
                    </IonContent> */}
                </IonModal></>






        )
    }
};

export default ListeVehicules;