import corn from 'node-cron';
// import {processReminder} from '../services/reminderService';
import processReminder from '../services/reminderService';

async function reminderJob(){
    corn.schedule('* * * * *',async()=>{
        try{
        await processReminder();
        console.log("Running reminder job");
        }
        catch(error){
            console.error("Error in reminder job",error);
        }
    });
}
export default reminderJob;