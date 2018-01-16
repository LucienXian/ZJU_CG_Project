#include <stdio.h>
#include <math.h>

int main()
{
	double sum = 0;
	int n = 0;
	char ch;
	while(((ch = getchar()) != '#') && (ch == 'v'))
	{
		double x, y, z;
		scanf("%lf", &x);
		scanf("%lf", &y);
		scanf("%lf", &z);
		printf("%lf %lf %lf\n",x, y, z); 
		x = 0.13 * x;
		y = 0.13 * y;
		z = 0.13 * z;
		sum += sqrt(x*x + y*y + z*z);
		n++;
		getchar();
	}
	printf("%d %lf\n", n, sum);
	printf("%lf\n", sum/n);
}
