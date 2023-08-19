<script setup>
// import { onMounted } from 'vue';
// import axios from 'axios';

// import { inject } from 'vue'

// // Les données à envoyer dans la requête POST
// const requestData = {
//   msg: "",
//   ref: "",
//   webhookOverride: ""
// };

// // Les en-têtes de la requête
// const requestHeaders = {
//   Authorization: 'Bearer ced426ef-dd5d-4a98-84cd-bedbe854bad0',
//   'Content-Type': 'application/json'
// };

// // Fonction pour effectuer la requête POST
// const postData = async () => {
//   try {
//     const response = await axios.post(
//       'https://api.thenextleg.io/v2/imagine',
//       requestData,
//       { headers: requestHeaders }
//     );

//     console.log(JSON.stringify(response.data));
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Fonction pour gérer le clic sur le bouton "Imagine"
// const sendMessage = () => {
//   postData();
// };

// onMounted(() => {
//   const ImaginePrompt = inject('ImaginePrompt')
//   console.log(ImaginePrompt);
// });
</script>
