import axios from "axios";
import axiosBaseUrl from "../axiosBaseUrl";

const getAllCategory = async () => {
        const res = await axiosBaseUrl.get("/categories");
        return res.data
    }

const addLabel = (val) => {
    return { value: val, label: val}
}


const getAllSubCategory = async (setSubject,setCollege,setSchool,setHobbies,setLanguages) => {

        const { data } = await axiosBaseUrl.get("/subCategories");
         data.subCategory.map((val)=>{
            const lebal = val.value.map(addLabel)
            switch (val.name) {
                case "subject":
                    setSubject(lebal)
                    break;
                case "college":
                    setCollege(lebal)
                    break;
                case "school":
                    setSchool(lebal)
                    break;
                case "hobbies":
                    setHobbies(lebal)
                    break;
                case "languages":
                    setLanguages(lebal)
                    break;
            
                default:
                    break;
            }
  
        })

}



const getAllTeacher = async ({...searchFt}) => {
    const {currentPage,subject,school,college,hobbies,languages,keyword,value,search} = searchFt;

        let newSubject = '';
        let newSchool = '';
        let newCollege = '';
        let newHobbies = '';
        let newLanguages = '';
        let newKeyword = '';
        if (subject.length > 0) {
            newSubject = subject.map((val) => val.value);
            newSubject = `&subject=${newSubject.join(',')}`;
        }
        if (school.length > 0) {
            newSchool = school.map((val) => val.value);
            newSchool = `&school=${newSchool.join(',')}`;
        }
        if (college.length > 0) {
            newCollege = college.map((val) => val.value);
            newCollege = `&college=${newCollege.join(',')}`;
        }
        if (hobbies.length > 0) {
            newHobbies = hobbies.map((val) => val.value);
            newHobbies = `&hobbies=${newHobbies.join(',')}`;
        }
        if (languages.length > 0) {
            newLanguages = languages.map((val) => val.value);
            newLanguages = `&languages=${newLanguages.join(',')}`;
        }
        if (keyword && value) {
            let newValue = value[0].toUpperCase() +
            value.slice(1)
            let searchVal = keyword
            if (search.search && search.val) {
                searchVal = search.search
                newValue = search.val[0].toUpperCase() +
                search.val.slice(1)
            }
            else{
                if (Array.isArray(value) &&value.length > 1 ) {  
                    newValue = value.split(' ').join(',');
                }
            }
  
            // newLanguages = languages.map((val) => val.value);
            searchVal==="all"?"":newKeyword = `&${searchVal}=${newValue}`;
            
        }


        let link = `/teachers?limit=20&page=${currentPage}${newSubject}${newSchool}${newCollege}${newLanguages}${newHobbies}${newKeyword}`;
        const res  = await axiosBaseUrl.get(link)
        return res.data;

}




export {  getAllCategory, getAllSubCategory,getAllTeacher }