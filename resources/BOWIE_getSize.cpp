#include <stdio.h>

int main()
{
	double max = 0, may = 0, maz = 0;
	char ch;
	while(((ch = getchar()) != '#') && (ch == 'v'))
	{
		double x, y, z;
		scanf("%lf", &x);
		scanf("%lf", &y);
		scanf("%lf", &z);
		printf("%lf %lf %lf\n",x, y, z); 
		if(max < x)
			max = x;
		if(may < y)
			may = y;
		if(maz < z)
			maz = z;
		getchar();
	}
	printf("%lf %lf %lf\n", max, may, maz);
}
