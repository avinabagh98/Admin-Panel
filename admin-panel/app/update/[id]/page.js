import UpdateForm from '../../components/UpdateForm';

export default function Update({ params }) {
    const { id } = params
    console.log(id)
    return (

        <UpdateForm />
    )
}