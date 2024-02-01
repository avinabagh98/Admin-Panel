
import UpdateForm from '../../../components/UpdateForm';
import axios from 'axios';

const getUserData = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/getuserrolewithid/${id}`);
        return res

    } catch (error) {
        console.log(error);
    }
}

export default async function Update({ params }) {
    const { id } = params;
    const userData = await getUserData(id)

    const name = (userData.data[0].name)
    const role = (userData.data[0].role.name)
    const username = (userData.data[0].username)


    return (
        <div>
            <UpdateForm id={id} name={name} username={username} role={role} />
        </div>
    )
}