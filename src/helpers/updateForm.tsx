export function updateForm(key: string){
    return function(e: React.ChangeEvent<HTMLInputElement>){
        setForm(prev =>({
            ...prev, key: e.target.value}))}
    }