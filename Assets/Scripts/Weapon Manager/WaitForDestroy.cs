using UnityEngine;
using System.Collections;

public class WaitForDestroy : MonoBehaviour {
	public float lifeTime = 0.3f;			//定义对象生存时间
	public bool isFade = false;				//是否逐渐消失，然后销毁
	public float duration = 0.01f;			//对颜色进行插值时的时间间隔
	// Use this for initialization
	void Awake() {
		if (!isFade) {
			Destroy (gameObject, lifeTime);	//lifeTime秒后摧毁对象
		} else {
			StartCoroutine (FadeAndDestroy ());	//颜色变淡销毁
		}
	}

	IEnumerator FadeAndDestroy(){
		while (true) {
			yield return new WaitForSeconds (lifeTime);	//等待lifetime秒
			Color c = //得到材质主颜色
				gameObject.GetComponent<Renderer>().material.GetColor ("_Color");
			c.a = Mathf.Lerp (c.a, 0.5f, duration);	//对颜色的alpha值进行插值
			gameObject.GetComponent<Renderer>().material.color = c; //改变材质颜色(alpha值不断减少)
			if (c.a < 0.52f) {                        //当alpha值小于0.5时，
				Destroy (gameObject);				//销毁对象
			}
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
