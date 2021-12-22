import axios from 'axios'
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
// const baseURL = 'http://localhost:3000/'
const baseURL = 'http://10.0.0.15:8081/'
=======
// const baseURL = 'http://10.0.0.15:8081/'
const baseURL = 'http://localhost:3000/'
>>>>>>> 03e867c37177fe99b920592e78d189f48e106bec
=======
const baseURL = 'http://localhost:3000/'
// const baseURL = 'http://10.0.0.15:8081/'
>>>>>>> Stashed changes
=======
const baseURL = 'http://localhost:3000/'
// const baseURL = 'http://10.0.0.15:8081/'
>>>>>>> Stashed changes
const instance  = axios.create({
    baseURL:baseURL
})
const Share = function(){
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
    const PluginList = ()=>instance.get(`plugin/management/`)
    // const  PluginList = ()=>instance.get(`nfv_mano_plugin`)
=======
    // const PluginList = ()=>instance.get(`plugin/management/`)
    const PluginList = ()=>instance.get(`data`)
>>>>>>> 03e867c37177fe99b920592e78d189f48e106bec
    const TemplateList = ()=>instance.get(`ObjectManagement/GenericTemplate/`)
=======
=======
>>>>>>> Stashed changes
    // const PluginList = ()=>instance.get(`plugin/management/`)
    const  PluginList = ()=>instance.get(`data`)
    // const TemplateList = ()=>instance.get(`ObjectManagement/GenericTemplate/`)
    const TemplateList = ()=>instance.get(`data`)
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    return {PluginList,TemplateList}
}
const nss_template = function(){
    const selected = (TemplateId)=>instance.get(`ObjectManagement/GenericTemplate/${TemplateId}/`)
    const nssTemplateList = ()=>instance.get(`ObjectManagement/SliceTemplate/`)
    const createNssTemplate = (from)=>instance.post(`ObjectManagement/SliceTemplate/`,from)
    const deleteNssTemplate = (templateId)=>instance.delete(`/ObjectManagement/NSS/SliceProfiles/${templateId}/`)
    return {selected, nssTemplateList, createNssTemplate, deleteNssTemplate}
}
const GenericTemplate = function(){
    const createGenericTemplate = (from)=>instance.post(`ObjectManagement/GenericTemplate/`,from)
    const updateGenericTemplate = (upId,from)=>instance.put(`ObjectManagement/GenericTemplate/${upId}/`,from)
    const deleteGenericTemplate = (templateId)=>instance.delete(`ObjectManagement/GenericTemplate/${templateId}/`)
    return{createGenericTemplate, updateGenericTemplate, deleteGenericTemplate}
}

const nfv_mano_plugin = function(){
    const createPluginList = (form)=>instance.post(`plugin/management/`,form)
    const updatePlugin = (pluginName,form)=>instance.patch(`plugin/management/${pluginName}/`,form)
    return{createPluginList, updatePlugin}
}
const NSS_Instance = function(){
    const deleteNssi = (nssiId)=>instance.delete(`ObjectManagement/NetworkSliceSubnet/${nssiId}/?scope=[%27BASE_NTH_LEVEL%27,0]`)
    const nssInstanceIist = ()=>instance.get(`ObjectManagement/NetworkSliceSubnet/*/?scope=[%27BASE_NTH_LEVEL%27,1]`) 
    return{nssInstanceIist, deleteNssi}   
}
const nssi_topology = function(){
    const showNssi = ()=>instance.get('ObjectManagement/NSS/topology/')
    const nssiSwitched = (paramsId)=> instance.get(`ObjectManagement/NSS/topology/${paramsId}/`)
    const showDeallocateNssiTopology = (id)=> instance.get(`ObjectManagement/NSS/topology/${id}/`)
    const deleteVnf = (nssiID)=> instance.delete(`ObjectManagement/NSS/SliceProfiles/${nssiID}/`)
    const allocateNssi = (json)=> instance.post(`ObjectManagement/NSS/SliceProfiles/`, json, {
        headers: {
          'Content-Type': 'application/json'
        }})
    const showAllocateNssiTopology = (nssiID)=> instance.get(`ObjectManagement/NSS/topology/${nssiID}`)
    return{showNssi, nssiSwitched, showDeallocateNssiTopology, deleteVnf, allocateNssi, showAllocateNssiTopology}
}
export {Share, nss_template, GenericTemplate, nfv_mano_plugin, NSS_Instance, nssi_topology}
