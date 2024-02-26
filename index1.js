
//Connecting Database
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/StudentData')
.then(()=>console.log("Database Connected Successfully"))
.catch(()=>console.log("Not Connected"))

//Creating Schema
const academicSchema=new mongoose.Schema({
    StudentId:Number,
    Name:String,
    Grades:[String],
    Subject:[String]
})

const co_curricularSchema=new mongoose.Schema({
    StudentId:Number,
    Name:String,
    ActivityType:String,
    Duration:Number,
    Achievements:String

})

//Creating Collections
const AcademicRecords=new mongoose.model('academic_records',academicSchema);
const CoCurricular=new mongoose.model('co_curricular',co_curricularSchema);

//Creating Documents
const createAcademicRecords=async()=>{
    try{
        const allData=await AcademicRecords.create([
            {
                StudentId:1,
                Name:'Sahithi',
                Grades:['A','B','A'],
                Subject:['Math','Science','Social']

            },
            {
                StudentId:2,
                Name:'Bhavya',
                Grades:['B','B','A'],
                Subject:['Math','Science','Social']

            },
            {
                StudentId:3,
                Name:'Mallika',
                Grades:['B','B','B'],
                Subject:['Math','Science','Social']

            },
            {
                StudentId:4,
                Name:'Malavika',
                Grades:['A','A','B'],
                Subject:['Math','Science','Social']

            }
        ]);
        
    }
    catch(e){
        console.log('Erroe in creating academic records',e);
    }
    
};


const createCoCurricular=async()=>{
    try{
        const fullData=await CoCurricular.create([
            {
                StudentId:1,
                Name:'Sahithi',
                ActivityType:'Sports',
                Duration:50,
                Achievements:'Won first place in Throwball'

            },
            {
                StudentId:2,
                Name:'Bhavya',
                ActivityType:'Sports',
                Duration:40,
                Achievements:'Won 2nd place in kho-kho'
                

            },
            {
                StudentId:3,
                Name:'Mallika',
                ActivityType:'Sports',
                Duration:60,
                Achievements:'won 3rd place in throwball'
                

            },
            {
                StudentId:4,
                Name:'Malavika',
                ActivityType:'Sports',
                Duration:45,
                Achievements:'Won 1st place in Badminton'

            }
        ]);
       
    
    }
    catch(e){
        console.log('error creating co-curricular activities:',e);
    }
};


//CRUD OPERATIONS


//READ
const getDocument=async()=>{
    try{
       

        
        const coCurricularActivities=await CoCurricular.find();
        console.log('Co-curricular activities:',coCurricularActivities);

        const academicRecords=await AcademicRecords.find();
        console.log('Academic records:',academicRecords);


    }
    catch(e){
        console.log('Error fetching Documents',e);
    }
    
};


//DELETE
const deleteDocument = async () => {
    try {
        const deletedCoCurricular = await CoCurricular.deleteOne({ StudentId: 1 });
        console.log('Deleted Co-curricular activity:', deletedCoCurricular);
        
        // Call getDocument function to display the updated collection after deletion
        await getDocument();
    } catch (e) {
        console.log('Error deleting documents:', e);
    }
};

// Call deleteDocument function




//UPDATE
const UpdateDocument=async()=>{
    try{
       await createAcademicRecords();
       await createCoCurricular();

        
        const coCurricularActivities=await CoCurricular.findOneAndUpdate(
            {StudentId:2},
            {$set:{ActivityType:'Music'}},
            {new: true}
            );
       

        const academicRecords=await AcademicRecords.findOneAndUpdate(
            {StudentId:2},
            {$set:{Name:"Bharathi"}},
            {new: true}
            );
        


    }
    catch(e){
        console.log('Error fetching Documents',e);
    }
    
};


const runAllOperations = async () => {
    try {
        // First, wait for all the initial operations to complete
       
        await UpdateDocument();
        // Log documents before deletion

        // After initial operations, proceed with delete operation
        await deleteDocument();
    } catch (error) {
        console.error('Error:', error);
    } 
};

// Call the function to run all operations
runAllOperations()
    .then(() => {
        // After all operations are done, you can directly call deleteDocument
        deleteDocument()
            .then(() => console.log("Delete operation completed"))
            .catch(error => console.error("Error during delete operation:", error));
    })
    .catch(error => console.error("Error during operations:", error));








