using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class LoadScene : MonoBehaviour {
	private AsyncOperation async; 
	public string Scenename;  //需要加载场景的名字
	public Slider progress_slider;
	public Text progress_text;
	
	void Start()
	{
		StartCoroutine(loadScene());
		//InvokeRepeating ("waitLoad",3, 1);

	}

	/*void waitLoad()
	{
		StartCoroutine(loadScene());
	}*/

	IEnumerator loadScene()
	{
		int displayProgress = 0;
		int toProgress = 0;
		async =Application.LoadLevelAsync (Scenename);
		
		async.allowSceneActivation = false;
		while (async.progress < 0.9f)
		{
			toProgress = (int)async.progress * 100;
			while (displayProgress < toProgress)
			{
				++displayProgress;

				progress_slider.value = displayProgress / 100f;
				progress_text.text  = "Loading..." + displayProgress + "%";

				yield return new WaitForEndOfFrame();
			}
		}
		
		toProgress = 100;
		while (displayProgress < toProgress)
		{
			++displayProgress;
			progress_slider.value = displayProgress / 100f;
			progress_text.text  = "Loading..." + displayProgress + "%";
			yield return new WaitForEndOfFrame();
		}
		async.allowSceneActivation = true;
	}
}
