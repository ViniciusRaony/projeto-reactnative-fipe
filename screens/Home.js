import React, { useState, useEffect } from 'react';
import { View, Text, Picker, Image, StyleSheet } from 'react-native';

const Home = () => {
  const [marcas, setMarcas] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState('');
  const [modelos, setModelos] = useState([]);
  const [selectedModelo, setSelectedModelo] = useState('');
  const [anos, setAnos] = useState([]);
  const [selectedAno, setSelectedAno] = useState('');
  const [veiculoInfo, setVeiculoInfo] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch(
        'https://parallelum.com.br/fipe/api/v1/carros/marcas'
      );
      const data = await response.json();
      setMarcas(data);
    } catch (error) {
      console.error('Erro ao buscar marcas:', error);
    }
  };

  const fetchModels = async (marcaId) => {
    try {
      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos`
      );
      const data = await response.json();
      setModelos(data.modelos);
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
    }
  };

  const fetchYears = async (marcaId, modeloId) => {
    try {
      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos/${modeloId}/anos`
      );
      const data = await response.json();
      setAnos(data);
    } catch (error) {
      console.error('Erro ao buscar anos:', error);
    }
  };

  const fetchVehicleInfo = async (marcaId, modeloId, ano) => {
    try {
      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos/${modeloId}/anos/${ano}`
      );
      const data = await response.json();
      setVeiculoInfo(data);
    } catch (error) {
      console.error('Erro ao buscar informação do veiculo:', error);
    }
  };

  const handleBrandChange = (marcaId) => {
    setSelectedMarca(marcaId);
    fetchModels(marcaId);
  };

  const handleModelChange = (modeloId) => {  
    setSelectedModelo(modeloId);
    fetchYears(selectedMarca, modeloId);
  };

  const handleYearChange = (selectedAno) => {
    setSelectedAno(selectedAno);
    fetchVehicleInfo(selectedMarca, selectedModelo, selectedAno);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-raony.png')}
        style={styles.image}
        resizeMode="contain"
      />
      
      <Text style={styles.label}>Marca:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMarca}
          minWidth="200"
          accessibilityLabel="Escolha a marca"
          placeholder="Escolha a marca"
          onValueChange={handleBrandChange}
        >
          <Picker.Item label="Escolha a marca" value="" />
          {marcas.map((marca) => (
            <Picker.Item
              key={marca.codigo}
              label={marca.nome}
              value={marca.codigo}
            />
          ))}
        </Picker>
      </View>
    
      <Text style={styles.label}>Modelo:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedModelo}
          minWidth="200"
          accessibilityLabel="Escolha o modelo"
          placeholder="Escolha o modelo"
          onValueChange={handleModelChange}
        >
          <Picker.Item label="Escolha o modelo" value="" />
          {modelos.map((modelo) => (
            <Picker.Item
              key={modelo.codigo}
              label={modelo.nome}
              value={modelo.codigo}
            />
          ))}
        </Picker>
      </View>
       
      <Text style={styles.label}>Ano:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedAno}
          minWidth="200"
          accessibilityLabel="Selecione o ano"
          placeholder="Selecione o ano"
          onValueChange={handleYearChange}
        >
          <Picker.Item label="Selecione o ano" value="" />
          {anos.map((ano) => (
            <Picker.Item
              key={ano.codigo}
              label={ano.nome}
              value={ano.codigo}
            />
          ))}
        </Picker>
      </View>

      {veiculoInfo && (
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Informações FIPE:</Text>
        <Text>Tipo: {veiculoInfo.TipoVeiculo}</Text>
        <Text style={{ color: 'green' }}>Valor: {veiculoInfo.Valor}</Text>
        <Text>Marca: {veiculoInfo.Marca}</Text>
        <Text>Modelo: {veiculoInfo.Modelo}</Text>
        <Text>Ano: {veiculoInfo.AnoModelo}</Text>
        <Text>Combustivel: {veiculoInfo.Combustivel}</Text>
        <Text>Código FIPE: {veiculoInfo.CodigoFipe}</Text>
        <Text>Mês referência: {veiculoInfo.MesReferencia}</Text>
        <Text>Tipo Combustivel: {veiculoInfo.SiglaCombustivel}</Text>
      </View>
       )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFDB58',
  },
  image: {
    width: '60%',
    height: 60,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  pickerContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Home;
