import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled"
import { useRef, useState } from "react";
import { useRouter } from "next/router";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const Wrapper = styled.div`

`

const NewForm = styled.div`
    width: 764px;
    height: 648px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
`

const Title = styled.div`
    width: 684px;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    margin: 40px 40px 20px 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #6400FF;
`
const TitleInputWrapper = styled.div`
    width: 684px;
    margin: 30px 40px 20px 40px;
    display: flex;
    justify-content: space-between;
`
const TitleInput = styled.input`
    width: 604px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

const ContentsInputWrapper = styled.div`
    width: 684px;
    margin: 30px 40px 20px 40px;
    display: flex;
    justify-content: space-between;
`
const ContentsInput = styled.input`
    width: 604px;
    height: 240px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 684px;
    margin: 30px 40px 20px 40px;
`

const UserNameWrapper = styled.div``
const UserName = styled.input`
    width: 242px;
    height: 40px;
    margin-left: 35px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

const UserPasswordWrapper = styled.div``
const UserPassword = styled.input`
    width: 242px;
    height: 40px;
    margin-left: 35px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

const Btn = styled.div`
    width: 764px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;
`

const SubmitBtn = styled.button`
    width: 80px;
    height: 30px;
    background: #6400FF;
    border-radius: 30px;
    color: white;
    border: none;
    cursor: pointer;
`

const CancleBtn = styled.button`
    margin-left: 10px;
    width: 80px;
    height: 30px;
    background: #999999;
    border-radius: 30px;
    border: none;
    color: white;
    cursor: pointer;
`

const Images = styled.div`
    width: 684px;
    display: flex;
    flex-direction: row;
`


const ImagesBtn = styled.div`
    /* background: #FAFAFA; */
    border: 1px dashed #E5E5E5;
    border-radius: 5px;
    width: 80px;
    height: 80px;
    margin-left: 39px;
    cursor: pointer;
`

const Img = styled.img`
    border-radius: 5px;
    width: 80px;
    height: 80px;
`

export default function BoardWritePage() {
    //????????? ???????????? ????????????
    const myImgRef = useRef(null)
    const [imgUrl, setImgUrl] = useState('')
    const [uploadFile] = useMutation(UPLOAD_FILE)

    const router = useRouter()

    const [createBoard] = useMutation(CREATE_BOARD)

    const [title, setTitle] = useState('')
    const [writer, setWriter] = useState('')
    const [contents, setContents] = useState('')
    const [password, setPassword] = useState('')

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeWriter = (event) => {
        setWriter(event.target.value)
    }

    const onChangeContents = (event) => {
        setContents(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onClickSubmit = async () => {
        try {
            const result = await createBoard({
                variables: {
                    createBoardInput: {
                        title: title,
                        writer: writer,
                        contents: contents,
                        password: password,
                        images: [imgUrl],
                    }
                }
            })
            alert('??? ?????? ??????!')
            router.push("/board/" + result.data.createBoard._id)
            console.log(result.data?.createBoard)
        } catch (error) {
            alert(error)
        }
    }

    const onChangeImg = async(event) => {
        const myImg = event.target.files?.[0]

        try {
            const result = await uploadFile({
                variables: { file: myImg },
            })
            setImgUrl(result.data?.uploadFile.url)
            alert('????????? ????????? ??????!')
            console.log(result)
        } catch (error) {
            alert(error)
        }
    }

    const onClickImg = () => {
        myImgRef.current?.click();
    }

    const onClickCancle = () => {
        router.push("/board")
    }


    return (
        <Wrapper>
            <NewForm>
                <Title>??? ??? ??????</Title>
                <TitleInputWrapper>
                    ?????? <TitleInput onChange={onChangeTitle} type="text"></TitleInput>
                </TitleInputWrapper>
                <ContentsInputWrapper>
                    ?????? <ContentsInput onChange={onChangeContents} type="text"></ContentsInput>
                </ContentsInputWrapper>
                <Images>
                    ?????????
                    <ImagesBtn onClick={onClickImg}>
                        <input style={{ display: "none" }} type="file" onChange={onChangeImg} ref={myImgRef} />
                        <Img src={"https://storage.googleapis.com/" + imgUrl} />
                    </ImagesBtn>
                </Images>
                <UserInfo>
                    <UserNameWrapper>
                        ????????? <UserName onChange={onChangeWriter} type="text"></UserName>
                    </UserNameWrapper>
                    <UserPasswordWrapper>
                        ???????????? <UserPassword onChange={onChangePassword} type="password"></UserPassword>
                    </UserPasswordWrapper>
                </UserInfo>
            </NewForm>
            <Btn>
                <SubmitBtn onClick={onClickSubmit}>??????</SubmitBtn>
                <CancleBtn onClick={onClickCancle}>??????</CancleBtn>
            </Btn>
        </Wrapper>
    )
}