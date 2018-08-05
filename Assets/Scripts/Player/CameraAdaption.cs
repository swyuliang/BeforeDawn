using UnityEngine;
using System.Collections;
public class CameraAdaption : MonoBehaviour
{
    //标准屏的宽与高度
    public static float desiginWidth = 800.0f;
    public static float desiginHeight = 480.0f;
    public static bool sound = true;
    AudioListener audioListener;
    void Awake()
    {
        sound = (PlayerPrefs.GetInt("sound", 1) == 1);
        //设置视口的缩放比
        GetComponent<Camera>().aspect = 800.0f / 480.0f;        
        //计算视口的GUI矩阵
        float lux = (Screen.width - CameraAdaption.desiginWidth * Screen.height / CameraAdaption.desiginHeight) / 2.0f;
        //
        GetComponent<Camera>().pixelRect = new Rect(lux, 0, Screen.width - 2 * lux, Screen.height);
        audioListener = GetComponent<AudioListener>();
        int soundflag = PlayerPrefs.GetInt("sound", 1);       
        audioListener.enabled = (soundflag == 1);
    }   

    //GUI自适应矩阵
    public static Matrix4x4 getMatrix()
    {
        //获取单位矩阵
        Matrix4x4 guiMatrix = Matrix4x4.identity;
        //计算位移距离
        float lux = (Screen.width - CameraAdaption.desiginWidth * Screen.height / CameraAdaption.desiginHeight) / 2.0f;
        //设置GUI矩阵，标准屏幕800*480
        guiMatrix.SetTRS(new Vector3(lux, 0, 0), Quaternion.identity, new Vector3(Screen.height / CameraAdaption.desiginHeight, Screen.height / CameraAdaption.desiginHeight, 1));
        //返回该矩阵
        return guiMatrix;
    }
    //GUI逆矩阵
    public static Matrix4x4 getInvertMatrix()
    {
        //获取GUI矩阵
        Matrix4x4 guiInverseMatrix = getMatrix();
        //计算GUI逆矩阵
        guiInverseMatrix = Matrix4x4.Inverse(guiInverseMatrix);
        //返回该矩阵
        return guiInverseMatrix;
    }
}
