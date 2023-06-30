export default function formatDate(date){
    return new Date(date).toLocaleDateString("en-GB",{
        month:"long",
        day:"numeric",
        year:"numeric"
    });
}