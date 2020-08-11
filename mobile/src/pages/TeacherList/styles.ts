import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f0f0f7'
  },
  teacherList:{
    marginTop: -35,
  },
  searchForm:{
    marginBottom: 10,
  },
  inputGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputBlock:{
    width: '48%'
  },
  label:{
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular'
  },
  input:{
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16
  },
  submitButton:{
    flexDirection: 'row',
    backgroundColor: '#04d361',
    height: 56,
    borderRadius: 8,
    alignItems:'center',
    justifyContent: 'center',
  },
  submitButtonText:{
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    marginLeft: 16
  }
});

export default style;