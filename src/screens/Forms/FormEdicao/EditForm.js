import React from 'react';
import { View, StyleSheet } from 'react-native';
import EditCaminhoes from '../../../components/FormEdicao/EditCaminhoes';
import EditBritadores from '../../../components/FormEdicao/EditBritadores';
import EditCompactadores from '../../../components/FormEdicao/EditCompactadores';
import EditEmpilhadeiras from '../../../components/FormEdicao/EditEmpilhadeiras';
import EditEscavadeiras from '../../../components/FormEdicao/EditEscavadeiras';
import EditGuindastes from '../../../components/FormEdicao/EditGuindastes';
import EditManipuladoresTelescopico from '../../../components/FormEdicao/EditManipuladoresTelescopico';
import EditMartelosHidraulico from '../../../components/FormEdicao/EditMartelosHidraulico';
import EditPerfuratriz from '../../../components/FormEdicao/EditPerfuratriz';
import EditPlataformasAerea from '../../../components/FormEdicao/EditPlataformasAerea';
import EditTratores from '../../../components/FormEdicao/EditTratores';
import EditUsinasdeAsfalto from '../../../components/FormEdicao/EditUsinasdeAsfalto';
import EditUsinasdeConcreto from '../../../components/FormEdicao/EditUsinasdeConcreto';
import EditServicos from '../../../components/FormEdicao/EditServicos';

export default function FormEdit({route, navigation}) {

    const {key, subnome, catnome} = route.params;
    navigation.setOptions({headerTitle: subnome.toUpperCase()});
    const keyUser = key;

    return (
        <View style={styles.container}>
            {catnome == "Caminhões" ? <EditCaminhoes data={keyUser}/> : null}
            {catnome == "Britadores" ? <EditBritadores data={keyUser}/> : null}
            {catnome == "Compactadores" ? <EditCompactadores data={keyUser}/> : null}
            {catnome == "Empilhadeiras" ? <EditEmpilhadeiras data={keyUser}/> : null}
            {catnome == "Escavadeiras" ? <EditEscavadeiras data={keyUser}/> : null}
            {catnome == "Guindastes" ? <EditGuindastes data={keyUser}/> : null}
            {catnome == "Manipuladores Telescópico" ? <EditManipuladoresTelescopico data={keyUser}/> : null}
            {catnome == "Martelos Hidraúlico" ? <EditMartelosHidraulico data={keyUser}/> : null}
            {catnome == "Perfuratriz" ? <EditPerfuratriz data={keyUser}/> : null}
            {catnome == "Plataformas Aérea" ? <EditPlataformasAerea data={keyUser}/> : null}
            {catnome == "Tratores" ? <EditTratores data={keyUser}/> : null}
            {catnome == "Usinas de Asfalto" ? <EditUsinasdeAsfalto data={keyUser}/> : null}
            {catnome == "Usinas de Concreto" ? <EditUsinasdeConcreto data={keyUser}/> : null}
            {catnome == "Serviços" ? <EditServicos data={keyUser}/> : null}
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    }
})