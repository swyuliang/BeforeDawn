using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class Loading : MonoBehaviour {

    public Texture2D h00;
    public Texture2D h10;
    public Texture2D h20;
    public Texture2D h30;
    public Texture2D h40;
    public Texture2D h50;
    public Texture2D h60;
    public Texture2D h70;
    public Texture2D h80;

    private float fps = 10.0f;
    private float time;
    //一组动画的贴图，在编辑器中赋值。
    public Texture2D[] animations;
    private int nowFram;
    //异步对象
    AsyncOperation async;

    ////读取场景的进度，它的取值范围在0 - 1 之间。
    //int progress = 0;

    public GameObject GuiT;
    public string TName;

    void Start()
    {
        //在这里开启一个异步任务，
        //进入loadScene方法。
        StartCoroutine(loadScene());
    }


    //注意这里返回值一定是 IEnumerator
    IEnumerator loadScene()
    {
        //Globe.loadName = "HSZ_001_DS_ZM";
        //异步读取场景。
        //Globe.loadName 就是A场景中需要读取的C场景名称。
        //async = Application.LoadLevelAsync(Globe.loadName);
        async = Application.LoadLevelAsync(TName);

        //async.allowSceneActivation = false;
        //while (async.progress < 0.9f)
        //{
        //    GuiT.guiText.text = "Loading..." + async.progress * 100 + "%";
        //    //SetLoadingPercentage(async.progress * 100);
        //    yield return new WaitForEndOfFrame();
        //}
        //GuiT.guiText.text = "Loading..." + "100%";
        //yield return new WaitForEndOfFrame();
        //async.allowSceneActivation = true;      

        ////读取完毕后返回， 系统会自动进入C场景
        //yield return async;

        int displayProgress = 0;
        int toProgress = 0;

        async.allowSceneActivation = false;
        while (async.progress < 0.9f)
        {
            toProgress = (int)async.progress * 100;
            while (displayProgress < toProgress)
            {
                ++displayProgress;
                //GuiT.guiText.text = "Loading..." + displayProgress + "%";
				GuiT.GetComponent<Text>().text = "Loading..." + displayProgress + "%";
                //SetLoadingPercentage(displayProgress);
                yield return new WaitForEndOfFrame();
            }
        }

        toProgress = 100;
        while (displayProgress < toProgress)
        {
            ++displayProgress;
            //GuiT.guiText.text = "Loading..." + displayProgress + "%";
            GuiT.GetComponent<Text>().text = "Loading..." + displayProgress + "%";
            //SetLoadingPercentage(displayProgress);
            yield return new WaitForEndOfFrame();
        }
        async.allowSceneActivation = true;

    }

    void OnGUI()
    {
                //************************************************
        ////因为在异步读取场景，
        ////所以这里我们可以刷新UI
        //DrawAnimation(animations);
                //************************************************

    }

    void Update()
    {

        //************************************************
        ////在这里计算读取的进度，
        ////progress 的取值范围在0.1 - 1之间， 但是它不会等于1
        ////也就是说progress可能是0.9的时候就直接进入新场景了
        ////所以在写进度条的时候需要注意一下。
        ////为了计算百分比 所以直接乘以100即可
        //progress = (int)(async.progress * 100);

        //GuiT.guiText.text = "Loading..." + progress + "%";

        ////有了读取进度的数值，大家可以自行制作进度条啦。
        //Debug.Log("xuanyusong" + progress);
        //************************************************


        //if (progress > 70)
        //{
        //    GuiP.guiTexture.texture = h80;
        //    return;
        //}
        //else if (progress > 60)
        //{
        //    GuiP.guiTexture.texture = h70;
        //    return;
        //}
        //else if (progress > 50)
        //{
        //    GuiP.guiTexture.texture = h60;
        //    return;
        //}
        //else if (progress > 40)
        //{
        //    GuiP.guiTexture.texture = h50;
        //    return;
        //}
        //else if (progress > 30)
        //{
        //    GuiP.guiTexture.texture = h40;
        //    return;
        //}
        //else if (progress > 20)
        //{
        //    GuiP.guiTexture.texture = h30;
        //    return;
        //}
        //else if (progress > 10)
        //{
        //    GuiP.guiTexture.texture = h20;
        //    return;
        //}
        //else if (progress > 0)
        //{
        //    GuiP.guiTexture.texture = h10;
        //    return;
        //}
        //else
        //{
        //    //g_Life.guiTexture.texture = h00;
        //    //GameObject g_losegame = GameObject.Find("GUILoseGame");
        //    //g_losegame.guiText.enabled = true;

        //    //if (!b_lose)
        //    //{
        //    //    endTime = Time.time;
        //    //    b_lose = true;
        //    //}
        //    //if (endTime + 2 < Time.time)
        //    //{ //屏幕停留7秒
        //    //    Application.LoadLevel(0);
        //    //}
        //    //return;
        //}

    }

    //这是一个简单绘制2D动画的方法，没什么好说的。
    void DrawAnimation(Texture2D[] tex)
	{

		time += Time.deltaTime;

		 if(time >= 1.0 / fps){

      	 	 nowFram++;

      	 	 time = 0;

      	 	 if(nowFram >= tex.Length)
      	 	 {
      	 	 	nowFram = 0;
      	 	 }
        }
		//GUI.DrawTexture(new Rect( 100,100,40,60) ,tex[nowFram] );

        //在这里显示读取的进度。
        //GUI.Label(new Rect( 100,180,300,60), "lOADING!!!!!" + progress);
        
        //GuiGo.guiText.text = "Loading..." + progress;


	}
}
